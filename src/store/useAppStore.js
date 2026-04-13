import { create } from 'zustand';
import { demoRoutes, demoStops, demoRouteStops, demoBuses, demoRatings } from '../lib/demoData';
import { languages, defaultLanguage } from '../lib/i18n';

const useAppStore = create((set, get) => ({
  // Theme
  darkMode: true,
  toggleDarkMode: () => {
    set((state) => {
      const newMode = !state.darkMode;
      document.documentElement.classList.toggle('dark', newMode);
      return { darkMode: newMode };
    });
  },

  // Language
  language: defaultLanguage,
  setLanguage: (lang) => {
    if (!languages[lang]) return;
    const dir = languages[lang].dir;
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
    set({ language: lang });
  },

  // Routes
  routes: demoRoutes,
  stops: demoStops,
  routeStops: demoRouteStops,
  buses: demoBuses,
  ratings: demoRatings,
  selectedRoute: null,

  setSelectedRoute: (routeId) => set({ selectedRoute: routeId }),

  getRouteStops: (routeId) => {
    const state = get();
    const routeStopEntries = state.routeStops
      .filter((rs) => rs.route_id === routeId)
      .sort((a, b) => a.order_index - b.order_index);
    return routeStopEntries.map((rs) => state.stops.find((s) => s.id === rs.stop_id)).filter(Boolean);
  },

  getRouteRatings: (routeId) => {
    return get().ratings.filter((r) => r.route_id === routeId);
  },

  getAverageRating: (routeId) => {
    const ratings = get().ratings.filter((r) => r.route_id === routeId);
    if (ratings.length === 0) return 0;
    return ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
  },

  // Admin actions
  addRoute: (route) => set((state) => ({ routes: [...state.routes, route] })),
  updateRoute: (id, data) =>
    set((state) => ({
      routes: state.routes.map((r) => (r.id === id ? { ...r, ...data } : r)),
    })),
  deleteRoute: (id) =>
    set((state) => ({
      routes: state.routes.filter((r) => r.id !== id),
      routeStops: state.routeStops.filter((rs) => rs.route_id !== id),
    })),

  addStop: (stop) => set((state) => ({ stops: [...state.stops, stop] })),
  updateStop: (id, data) =>
    set((state) => ({
      stops: state.stops.map((s) => (s.id === id ? { ...s, ...data } : s)),
    })),
  deleteStop: (id) =>
    set((state) => ({
      stops: state.stops.filter((s) => s.id !== id),
      routeStops: state.routeStops.filter((rs) => rs.stop_id !== id),
    })),

  addRouteStop: (routeStop) =>
    set((state) => ({ routeStops: [...state.routeStops, routeStop] })),
  removeRouteStop: (routeId, stopId) =>
    set((state) => ({
      routeStops: state.routeStops.filter(
        (rs) => !(rs.route_id === routeId && rs.stop_id === stopId)
      ),
    })),
  reorderRouteStops: (routeId, newOrder) =>
    set((state) => ({
      routeStops: [
        ...state.routeStops.filter((rs) => rs.route_id !== routeId),
        ...newOrder,
      ],
    })),

  addBus: (bus) => set((state) => ({ buses: [...state.buses, bus] })),
  updateBus: (id, data) =>
    set((state) => ({
      buses: state.buses.map((b) => (b.id === id ? { ...b, ...data } : b)),
    })),
  deleteBus: (id) =>
    set((state) => ({ buses: state.buses.filter((b) => b.id !== id) })),

  addRating: (rating) =>
    set((state) => ({ ratings: [...state.ratings, rating] })),
  deleteRating: (id) =>
    set((state) => ({ ratings: state.ratings.filter((r) => r.id !== id) })),

  // Search
  searchOrigin: null,
  searchDestination: null,
  searchResults: null,
  setSearchOrigin: (origin) => set({ searchOrigin: origin }),
  setSearchDestination: (dest) => set({ searchDestination: dest }),

  findRoutes: (origin, destination) => {
    const state = get();
    const results = [];
    const maxWalkDistance = 1.5; // km

    for (const route of state.routes) {
      const stops = state.getRouteStops(route.id);
      if (stops.length < 2) continue;

      let nearestToOrigin = null;
      let nearestToOriginDist = Infinity;
      let nearestToOriginIdx = -1;

      let nearestToDest = null;
      let nearestToDestDist = Infinity;
      let nearestToDestIdx = -1;

      stops.forEach((stop, idx) => {
        const distToOrigin = getDistanceKm(origin.lat, origin.lng, stop.latitude, stop.longitude);
        const distToDest = getDistanceKm(destination.lat, destination.lng, stop.latitude, stop.longitude);

        if (distToOrigin < nearestToOriginDist) {
          nearestToOriginDist = distToOrigin;
          nearestToOrigin = stop;
          nearestToOriginIdx = idx;
        }
        if (distToDest < nearestToDestDist) {
          nearestToDestDist = distToDest;
          nearestToDest = stop;
          nearestToDestIdx = idx;
        }
      });

      if (
        nearestToOriginDist <= maxWalkDistance &&
        nearestToDestDist <= maxWalkDistance &&
        nearestToOriginIdx < nearestToDestIdx
      ) {
        const routeStopsSlice = stops.slice(nearestToOriginIdx, nearestToDestIdx + 1);
        let totalRouteDistance = 0;
        for (let i = 0; i < routeStopsSlice.length - 1; i++) {
          totalRouteDistance += getDistanceKm(
            routeStopsSlice[i].latitude, routeStopsSlice[i].longitude,
            routeStopsSlice[i + 1].latitude, routeStopsSlice[i + 1].longitude
          );
        }

        results.push({
          route,
          boardStop: nearestToOrigin,
          alightStop: nearestToDest,
          walkToStop: nearestToOriginDist,
          walkFromStop: nearestToDestDist,
          routeDistance: totalRouteDistance,
          numStops: nearestToDestIdx - nearestToOriginIdx,
          estimatedTime: Math.round((nearestToOriginDist / 5) * 60 + (totalRouteDistance / 20) * 60 + (nearestToDestDist / 5) * 60),
          stopsOnRoute: routeStopsSlice,
        });
      }
    }

    results.sort((a, b) => a.estimatedTime - b.estimatedTime);
    set({ searchResults: results, searchOrigin: origin, searchDestination: destination });
    return results;
  },

  clearSearch: () => set({ searchOrigin: null, searchDestination: null, searchResults: null }),

  // Simulated bus tracking
  busLocations: {},
  simulateBusLocation: (busId, routeId) => {
    const state = get();
    const stops = state.getRouteStops(routeId);
    if (stops.length === 0) return;
    const randomIdx = Math.floor(Math.random() * stops.length);
    const stop = stops[randomIdx];
    const jitterLat = (Math.random() - 0.5) * 0.002;
    const jitterLng = (Math.random() - 0.5) * 0.002;
    set((prev) => ({
      busLocations: {
        ...prev.busLocations,
        [busId]: {
          latitude: stop.latitude + jitterLat,
          longitude: stop.longitude + jitterLng,
          timestamp: new Date().toISOString(),
          nearStop: stop.name,
        },
      },
    }));
  },
}));

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default useAppStore;
