# 🚌 TARIQI Bus — Smart Public Transport System for Algeria

**TARIQI Bus** (طريقي باص) is a modern, mobile-first web application for navigating Algeria's public transport system. Built with React, Leaflet, and Supabase.

![TARIQI Bus](https://img.shields.io/badge/TARIQI-Bus-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)

## ✨ Features

### 🗺️ Interactive Map
- View all bus routes on an interactive OpenStreetMap
- Color-coded route polylines with stop markers
- Click routes to see detailed stop information
- Simulated live bus positions

### 🔍 Smart Search (A → B Navigation)
- Search by stop name or click on the map
- Find best bus routes between two points
- See walking distance, estimated time, and number of stops
- Alternative route suggestions

### 📊 Admin Dashboard
- Create, edit, and delete bus routes
- Manage stops with coordinates
- Manage bus fleet (assign routes, set status)
- Moderate user reviews
- Monitor simulated bus tracking

### ⭐ Ratings & Reviews
- Rate bus lines (1–5 stars)
- Leave comments about service quality
- View average ratings per route

### 🌍 Multilingual (i18n)
- **Français** (default)
- **العربية** (Arabic with full RTL support)
- **English**

### 📱 Mobile-First PWA
- Installable on Android/iPhone
- Offline-capable
- Responsive design with bottom navigation
- Dark mode support

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| State | Zustand 5 |
| Maps | Leaflet + react-leaflet + OpenStreetMap |
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| Icons | Lucide React |
| PWA | vite-plugin-pwa |
| Deploy | Vercel (frontend) + Supabase (backend) |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/mdouaour/Tari9i-Bus.git
cd Tari9i-Bus

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs in **demo mode** by default with sample Algiers bus route data — no Supabase setup required.

### Build for Production

```bash
npm run build
npm run preview
```

## 🔧 Supabase Setup (Optional)

To connect a real backend:

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your **Project URL** and **anon/public key** from Settings > API

### 2. Run the Schema
1. Go to **SQL Editor** in Supabase Dashboard
2. Paste and run the contents of `supabase/schema.sql`
3. This creates all tables, indexes, RLS policies, and seed data

### 3. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Enable Realtime (for bus tracking)
In Supabase Dashboard > Database > Replication, enable realtime for `bus_locations` table.

## 🌐 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
4. Deploy — Vercel auto-detects Vite

The `vercel.json` config handles SPA client-side routing.

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/          # Admin dashboard components
│   │   ├── BusManager.jsx
│   │   ├── CommentModerator.jsx
│   │   ├── RouteManager.jsx
│   │   └── StopManager.jsx
│   ├── layout/         # App layout (header, nav, footer)
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   └── MobileNav.jsx
│   ├── map/            # Map components
│   │   ├── BusMap.jsx
│   │   └── RouteListPanel.jsx
│   ├── ratings/        # Ratings & reviews
│   │   └── RatingsPanel.jsx
│   ├── search/         # A→B search
│   │   └── SearchPanel.jsx
│   └── tracking/       # Bus tracking
│       └── TrackingPanel.jsx
├── hooks/
│   ├── useSimulation.js    # Simulated bus tracking
│   └── useTranslation.js   # i18n hook
├── lib/
│   ├── demoData.js     # Demo data (works without Supabase)
│   ├── supabase.js     # Supabase client
│   └── i18n/           # Translations
│       ├── index.js
│       ├── en.js
│       ├── fr.js
│       └── ar.js
├── pages/
│   ├── AdminPage.jsx
│   ├── MapPage.jsx
│   ├── RatingsPage.jsx
│   ├── RoutesPage.jsx
│   └── SearchPage.jsx
├── store/
│   └── useAppStore.js  # Zustand global state
├── App.jsx
├── main.jsx
└── index.css
supabase/
└── schema.sql          # Full database schema + RLS + seed data
```

## 🗄️ Database Schema

```
profiles     → User accounts (extends Supabase Auth)
buses        → Bus fleet management
routes       → Bus route definitions
stops        → Geographic stop locations
route_stops  → Ordered stops per route (junction table)
bus_locations → GPS tracking positions
ratings      → User reviews per route
```

All tables have Row Level Security (RLS) enabled with role-based access control (user/admin/driver).

## 🇩🇿 Adapted for Algeria

- Works without official transport APIs
- Designed for low-bandwidth environments
- Routes can be manually managed by admins
- Bus tracking starts with simulation (Phase 1), ready for real GPS (Phase 2+)
- Supports Arabic (RTL) and French interfaces
- Uses OpenStreetMap (free, no API key required)

## 📋 MVP Phases

- [x] **Phase 1**: Static bus routes on interactive map
- [x] **Phase 2**: Admin route/stop/bus management system
- [x] **Phase 3**: A → B search navigation with walking directions
- [x] **Phase 4**: Simulated bus tracking system
- [x] **Phase 5**: Ratings & comments system
- [x] **Bonus**: i18n (AR/FR/EN), dark mode, PWA

## 📄 License

MIT
