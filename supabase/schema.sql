-- ============================================================
-- TARIQI Bus - Supabase Database Schema
-- Smart Public Transport System for Algeria
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS TABLE
-- ============================================================
-- Supabase Auth handles user authentication.
-- This table extends auth.users with app-specific fields.
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'driver')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- BUSES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.buses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bus_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROUTES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bus_number TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#3b82f6',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  bus_id UUID REFERENCES public.buses(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- STOPS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.stops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROUTE_STOPS TABLE (junction table with ordering)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.route_stops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_id UUID NOT NULL REFERENCES public.routes(id) ON DELETE CASCADE,
  stop_id UUID NOT NULL REFERENCES public.stops(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(route_id, stop_id)
);

-- ============================================================
-- BUS_LOCATIONS TABLE (for GPS tracking)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.bus_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bus_id UUID NOT NULL REFERENCES public.buses(id) ON DELETE CASCADE,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- RATINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL DEFAULT 'Anonymous',
  route_id UUID NOT NULL REFERENCES public.routes(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_route_stops_route ON public.route_stops(route_id);
CREATE INDEX IF NOT EXISTS idx_route_stops_stop ON public.route_stops(stop_id);
CREATE INDEX IF NOT EXISTS idx_bus_locations_bus ON public.bus_locations(bus_id);
CREATE INDEX IF NOT EXISTS idx_bus_locations_timestamp ON public.bus_locations(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_ratings_route ON public.ratings(route_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.route_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bus_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, update own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Routes: everyone can read, admins can write
CREATE POLICY "Routes are viewable by everyone" ON public.routes FOR SELECT USING (true);
CREATE POLICY "Admins can insert routes" ON public.routes FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update routes" ON public.routes FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete routes" ON public.routes FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Stops: everyone can read, admins can write
CREATE POLICY "Stops are viewable by everyone" ON public.stops FOR SELECT USING (true);
CREATE POLICY "Admins can insert stops" ON public.stops FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update stops" ON public.stops FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete stops" ON public.stops FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Route stops: everyone can read, admins can write
CREATE POLICY "Route stops are viewable by everyone" ON public.route_stops FOR SELECT USING (true);
CREATE POLICY "Admins can insert route stops" ON public.route_stops FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update route stops" ON public.route_stops FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete route stops" ON public.route_stops FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Buses: everyone can read, admins can write
CREATE POLICY "Buses are viewable by everyone" ON public.buses FOR SELECT USING (true);
CREATE POLICY "Admins can insert buses" ON public.buses FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update buses" ON public.buses FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete buses" ON public.buses FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Bus locations: everyone can read, drivers and admins can write
CREATE POLICY "Bus locations are viewable by everyone" ON public.bus_locations FOR SELECT USING (true);
CREATE POLICY "Drivers can insert bus locations" ON public.bus_locations FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('driver', 'admin'))
);

-- Ratings: everyone can read, authenticated users can write, admins can delete
CREATE POLICY "Ratings are viewable by everyone" ON public.ratings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert ratings" ON public.ratings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update own ratings" ON public.ratings FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Admins can delete ratings" ON public.ratings FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================================
-- SEED DATA (sample Algiers routes)
-- ============================================================
INSERT INTO public.stops (id, name, latitude, longitude) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Bab Ezzouar - Université', 36.7188, 3.1803),
  ('00000000-0000-0000-0000-000000000002', 'Les Bananiers', 36.7243, 3.1560),
  ('00000000-0000-0000-0000-000000000003', 'Mohammadia', 36.7325, 3.1280),
  ('00000000-0000-0000-0000-000000000004', 'El Harrach Gare', 36.7210, 3.1360),
  ('00000000-0000-0000-0000-000000000005', 'Belfort - Hussein Dey', 36.7380, 3.1010),
  ('00000000-0000-0000-0000-000000000006', 'Ruisseau', 36.7450, 3.0810),
  ('00000000-0000-0000-0000-000000000007', 'Hamma - Jardin d''Essai', 36.7520, 3.0650),
  ('00000000-0000-0000-0000-000000000008', 'Alger Centre - Grande Poste', 36.7538, 3.0588)
ON CONFLICT DO NOTHING;

INSERT INTO public.routes (id, name, bus_number, color, status) VALUES
  ('00000000-0000-0000-0000-000000000101', 'Ligne 1 - Bab Ezzouar → Alger Centre', '1', '#ef4444', 'active')
ON CONFLICT DO NOTHING;

INSERT INTO public.route_stops (route_id, stop_id, order_index) VALUES
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 0),
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000002', 1),
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000003', 2),
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000004', 3),
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000005', 4),
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000006', 5),
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000007', 6),
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000008', 7)
ON CONFLICT DO NOTHING;
