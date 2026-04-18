import { supabase } from '../../lib/supabase';
import { getDemoTransportData } from './demoData';
import { loadData, saveData } from './cacheService';

function buildCacheKey(wilayaId) {
  return `transport:wilaya:${wilayaId}`;
}

function normalize(raw, wilayaId) {
  const routeStops = raw.routeStops || raw.route_stops || [];
  const routes = (raw.routes || []).map((route) => {
    const routeWilaya = route.wilayaId ?? route.wilaya_id ?? route.city ?? wilayaId;
    return { ...route, wilayaId: Number(routeWilaya), city: Number(routeWilaya) };
  });
  const stops = (raw.stops || []).map((stop) => {
    const stopWilaya = stop.wilayaId ?? stop.wilaya_id ?? stop.city ?? wilayaId;
    return { ...stop, wilayaId: Number(stopWilaya), city: Number(stopWilaya) };
  });
  const buses = (raw.buses || []).map((bus) => {
    const busWilaya = bus.wilayaId ?? bus.wilaya_id ?? bus.city ?? wilayaId;
    return { ...bus, wilayaId: Number(busWilaya), city: Number(busWilaya) };
  });
  return {
    routes,
    stops,
    buses,
    routeStops,
    ratings: raw.ratings || [],
    suggestions: raw.suggestions || [],
  };
}

async function fetchSupabaseData(wilayaId) {
  if (!supabase) return null;

  const [routesRes, stopsRes, routeStopsRes, busesRes, ratingsRes] = await Promise.all([
    supabase.from('routes').select('*').eq('wilaya_id', wilayaId),
    supabase.from('stops').select('*').eq('wilaya_id', wilayaId),
    supabase.from('route_stops').select('*').eq('wilaya_id', wilayaId),
    supabase.from('buses').select('*').eq('wilaya_id', wilayaId),
    supabase.from('ratings').select('*').eq('wilaya_id', wilayaId),
  ]);

  if (routesRes.error || stopsRes.error || routeStopsRes.error || busesRes.error) {
    throw new Error('Supabase transport load failed');
  }

  return normalize(
    {
      routes: routesRes.data || [],
      stops: stopsRes.data || [],
      routeStops: routeStopsRes.data || [],
      buses: busesRes.data || [],
      ratings: ratingsRes.data || [],
    },
    wilayaId
  );
}

export async function loadWilayaTransportData(wilayaId) {
  const cacheKey = buildCacheKey(wilayaId);

  try {
    const supabaseData = await fetchSupabaseData(wilayaId);
    if (supabaseData) {
      saveData(cacheKey, supabaseData);
      return { ...supabaseData, source: 'supabase' };
    }
  } catch {
    // fallback below
  }

  const cached = loadData(cacheKey);
  if (cached) {
    return { ...normalize(cached, wilayaId), source: 'cache' };
  }

  const demo = normalize(getDemoTransportData(wilayaId), wilayaId);
  saveData(cacheKey, demo);
  return { ...demo, source: 'demo' };
}

export function persistWilayaTransportData(wilayaId, data) {
  return saveData(buildCacheKey(wilayaId), normalize(data, wilayaId));
}
