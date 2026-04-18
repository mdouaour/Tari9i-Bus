import { create } from 'zustand';
import { ALGERIAN_WILAYAS, DEFAULT_WILAYA_ID, getWilayaById } from '../core/services/wilayas';
import { languages, defaultLanguage } from '../lib/i18n';
import { loadWilayaTransportData, persistWilayaTransportData } from '../core/services/transportService';
import { getNearestStop, findRoute } from '../core/services/routingService';

const defaultAccessibility = {
  darkMode: true,
  highContrast: false,
  largeText: false,
};

function applyLanguageAttrs(lang) {
  const dir = languages[lang]?.dir || 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', lang);
}

function applyAccessibilityMode(state) {
  document.documentElement.classList.toggle('dark', state.darkMode);
  document.documentElement.classList.toggle('high-contrast', state.highContrast);
  document.documentElement.classList.toggle('large-text', state.largeText);
}

function hydratePreferences() {
  try {
    const raw = localStorage.getItem('tariqi-bus:preferences');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function savePreferences(preferences) {
  try {
    localStorage.setItem('tariqi-bus:preferences', JSON.stringify(preferences));
  } catch {
    // ignore
  }
}

const persisted = hydratePreferences();
const initialLanguage = persisted?.language && languages[persisted.language] ? persisted.language : defaultLanguage;
const initialAccessibility = {
  ...defaultAccessibility,
  ...(persisted?.accessibility || {}),
};

const useAppStore = create((set, get) => ({
  language: initialLanguage,
  ...initialAccessibility,

  selectedWilaya: Number(persisted?.selectedWilaya || DEFAULT_WILAYA_ID),
  selectedCity: Number(persisted?.selectedWilaya || DEFAULT_WILAYA_ID),
  wilayas: ALGERIAN_WILAYAS,

  stops: [],
  routes: [],
  routeStops: [],
  buses: [],
  ratings: [],
  suggestions: [],

  searchOrigin: null,
  searchDestination: null,
  searchResult: null,
  searchResults: null,
  selectedRoute: null,
  selectedStop: null,

  busLocations: {},
  dataSource: 'demo',
  initialized: false,

  setLanguage: (lang) => {
    if (!languages[lang]) return;
    applyLanguageAttrs(lang);
    set({ language: lang });
    const state = get();
    savePreferences({
      language: lang,
      selectedWilaya: state.selectedWilaya,
      accessibility: {
        darkMode: state.darkMode,
        highContrast: state.highContrast,
        largeText: state.largeText,
      },
    });
  },

  toggleDarkMode: () => {
    set((state) => {
      const next = { darkMode: !state.darkMode };
      applyAccessibilityMode({ ...state, ...next });
      return next;
    });
    const state = get();
    savePreferences({
      language: state.language,
      selectedWilaya: state.selectedWilaya,
      accessibility: {
        darkMode: state.darkMode,
        highContrast: state.highContrast,
        largeText: state.largeText,
      },
    });
  },

  toggleHighContrast: () => {
    set((state) => {
      const next = { highContrast: !state.highContrast };
      applyAccessibilityMode({ ...state, ...next });
      return next;
    });
    const state = get();
    savePreferences({
      language: state.language,
      selectedWilaya: state.selectedWilaya,
      accessibility: {
        darkMode: state.darkMode,
        highContrast: state.highContrast,
        largeText: state.largeText,
      },
    });
  },

  toggleLargeText: () => {
    set((state) => {
      const next = { largeText: !state.largeText };
      applyAccessibilityMode({ ...state, ...next });
      return next;
    });
    const state = get();
    savePreferences({
      language: state.language,
      selectedWilaya: state.selectedWilaya,
      accessibility: {
        darkMode: state.darkMode,
        highContrast: state.highContrast,
        largeText: state.largeText,
      },
    });
  },

  getCityInfo: (wilayaId) => getWilayaById(wilayaId || get().selectedWilaya),

  setWilaya: async (wilayaId) => {
    const parsed = Number(wilayaId);
    if (!parsed) return;
    set({ selectedWilaya: parsed, selectedCity: parsed, selectedRoute: null, selectedStop: null, searchResult: null, searchResults: null });
    savePreferences({
      language: get().language,
      selectedWilaya: parsed,
      accessibility: {
        darkMode: get().darkMode,
        highContrast: get().highContrast,
        largeText: get().largeText,
      },
    });
    await get().loadCurrentWilayaData(parsed);
  },

  setSelectedCity: async (wilayaId) => {
    await get().setWilaya(wilayaId);
  },

  setStops: (stops) => set({ stops }),
  setRoutes: (routes) => set({ routes }),
  setBuses: (buses) => set({ buses }),
  setSearchResult: (result) => set({ searchResult: result, searchResults: result ? [result] : null }),
  setSelectedRoute: (routeId) => set({ selectedRoute: routeId }),
  setSelectedStop: (stopId) => set({ selectedStop: stopId }),
  setSearchOrigin: (origin) => set({ searchOrigin: origin }),
  setSearchDestination: (destination) => set({ searchDestination: destination }),

  updateBusLocation: (busId, location) => {
    set((state) => ({
      busLocations: {
        ...state.busLocations,
        [busId]: {
          ...location,
          timestamp: location.timestamp || new Date().toISOString(),
        },
      },
    }));
  },

  loadCurrentWilayaData: async (wilayaId = get().selectedWilaya) => {
    const data = await loadWilayaTransportData(Number(wilayaId));
    set({
      stops: data.stops,
      routes: data.routes,
      routeStops: data.routeStops,
      buses: data.buses,
      ratings: data.ratings,
      suggestions: data.suggestions,
      dataSource: data.source || 'demo',
      initialized: true,
    });
  },

  initializeApp: async () => {
    applyLanguageAttrs(get().language);
    applyAccessibilityMode(get());
    await get().loadCurrentWilayaData(get().selectedWilaya);
  },

  getFilteredStops: () => get().stops.filter((stop) => Number(stop.wilayaId) === Number(get().selectedWilaya)),
  getFilteredRoutes: () => get().routes.filter((route) => Number(route.wilayaId) === Number(get().selectedWilaya)),
  getFilteredBuses: () => get().buses.filter((bus) => Number(bus.wilayaId) === Number(get().selectedWilaya)),

  getRouteStops: (routeId) => {
    const state = get();
    const ordered = state.routeStops
      .filter((item) => item.route_id === routeId)
      .sort((a, b) => a.order_index - b.order_index);
    return ordered.map((item) => state.stops.find((stop) => stop.id === item.stop_id)).filter(Boolean);
  },

  findRoutes: (origin, destination) => {
    const state = get();
    const stops = state.getFilteredStops();
    const routes = state.getFilteredRoutes();
    const nearestFrom = getNearestStop(origin.lat, origin.lng, stops);
    const nearestTo = getNearestStop(destination.lat, destination.lng, stops);

    if (!nearestFrom || !nearestTo) {
      set({ searchResult: null, searchResults: [] });
      return [];
    }

    const path = findRoute(nearestFrom.stop.id, nearestTo.stop.id, stops, routes, state.routeStops);
    if (!path) {
      set({ searchResult: null, searchResults: [] });
      return [];
    }

    const result = {
      nearestStartStop: nearestFrom.stop,
      nearestEndStop: nearestTo.stop,
      walkToStartKm: nearestFrom.distanceKm,
      walkFromEndKm: nearestTo.distanceKm,
      ...path,
      estimatedTime: Math.max(5, Math.round((path.stops.length - 1) * 4 + (nearestFrom.distanceKm + nearestTo.distanceKm) * 12)),
    };

    set({ searchOrigin: origin, searchDestination: destination, searchResult: result, searchResults: [result] });
    return [result];
  },

  clearSearch: () => set({ searchOrigin: null, searchDestination: null, searchResult: null, searchResults: null }),

  addRoute: (route) => set((state) => {
    const next = [...state.routes, { ...route, wilayaId: Number(state.selectedWilaya), city: Number(state.selectedWilaya) }];
    persistWilayaTransportData(state.selectedWilaya, { ...state, routes: next });
    return { routes: next };
  }),

  updateRoute: (id, data) => set((state) => {
    const next = state.routes.map((route) => (route.id === id ? { ...route, ...data } : route));
    persistWilayaTransportData(state.selectedWilaya, { ...state, routes: next });
    return { routes: next };
  }),

  deleteRoute: (id) => set((state) => {
    const nextRoutes = state.routes.filter((route) => route.id !== id);
    const nextRouteStops = state.routeStops.filter((entry) => entry.route_id !== id);
    persistWilayaTransportData(state.selectedWilaya, { ...state, routes: nextRoutes, routeStops: nextRouteStops });
    return { routes: nextRoutes, routeStops: nextRouteStops };
  }),

  addStop: (stop) => set((state) => {
    const next = [...state.stops, { ...stop, wilayaId: Number(state.selectedWilaya), city: Number(state.selectedWilaya) }];
    persistWilayaTransportData(state.selectedWilaya, { ...state, stops: next });
    return { stops: next };
  }),

  updateStop: (id, data) => set((state) => {
    const next = state.stops.map((stop) => (stop.id === id ? { ...stop, ...data } : stop));
    persistWilayaTransportData(state.selectedWilaya, { ...state, stops: next });
    return { stops: next };
  }),

  deleteStop: (id) => set((state) => {
    const nextStops = state.stops.filter((stop) => stop.id !== id);
    const nextRouteStops = state.routeStops.filter((entry) => entry.stop_id !== id);
    persistWilayaTransportData(state.selectedWilaya, { ...state, stops: nextStops, routeStops: nextRouteStops });
    return { stops: nextStops, routeStops: nextRouteStops };
  }),

  addRouteStop: (routeStop) => set((state) => ({ routeStops: [...state.routeStops, routeStop] })),
  removeRouteStop: (routeId, stopId) => set((state) => ({
    routeStops: state.routeStops.filter((entry) => !(entry.route_id === routeId && entry.stop_id === stopId)),
  })),

  addBus: (bus) => set((state) => ({
    buses: [...state.buses, { ...bus, wilayaId: Number(state.selectedWilaya), city: Number(state.selectedWilaya) }],
  })),

  updateBus: (id, data) => set((state) => ({
    buses: state.buses.map((bus) => (bus.id === id ? { ...bus, ...data } : bus)),
  })),

  deleteBus: (id) => set((state) => ({ buses: state.buses.filter((bus) => bus.id !== id) })),

  addRating: (rating) => set((state) => ({ ratings: [...state.ratings, rating] })),
  deleteRating: (id) => set((state) => ({ ratings: state.ratings.filter((rating) => rating.id !== id) })),
  getRouteRatings: (routeId) => get().ratings.filter((rating) => rating.route_id === routeId),
  getAverageRating: (routeId) => {
    const values = get().ratings.filter((rating) => rating.route_id === routeId);
    if (!values.length) return 0;
    return values.reduce((acc, item) => acc + item.rating, 0) / values.length;
  },

  addSuggestion: (suggestion) => set((state) => ({
    suggestions: [
      ...state.suggestions,
      {
        id: `sg-${Date.now()}`,
        status: 'pending',
        wilayaId: state.selectedWilaya,
        created_at: new Date().toISOString(),
        ...suggestion,
      },
    ],
  })),
}));

export default useAppStore;
