import { DEFAULT_WILAYA_ID } from './wilayas';

const ROUTE_COLORS = {
  blue: '#2563eb',
  red: '#dc2626',
  green: '#16a34a',
  orange: '#ea580c',
};

const guelmaStops = [
  { id: 'g-stop-01', wilayaId: 24, name: 'Gare Routière Guelma', latitude: 36.4598, longitude: 7.4242 },
  { id: 'g-stop-02', wilayaId: 24, name: 'Place du 8 Mai 1945', latitude: 36.4622, longitude: 7.4267 },
  { id: 'g-stop-03', wilayaId: 24, name: 'Cité Frères Rahabi', latitude: 36.4646, longitude: 7.4308 },
  { id: 'g-stop-04', wilayaId: 24, name: 'Hôpital Hakim Okbi', latitude: 36.4668, longitude: 7.4356 },
  { id: 'g-stop-05', wilayaId: 24, name: 'Université 8 Mai 1945', latitude: 36.4745, longitude: 7.4458 },
  { id: 'g-stop-06', wilayaId: 24, name: 'Cité 1000 Logements', latitude: 36.4704, longitude: 7.4218 },
  { id: 'g-stop-07', wilayaId: 24, name: 'Hay Bouakal', latitude: 36.4587, longitude: 7.4381 },
  { id: 'g-stop-08', wilayaId: 24, name: 'Stade Messaoud Zougar', latitude: 36.4561, longitude: 7.4462 },
  { id: 'g-stop-09', wilayaId: 24, name: 'Bab Essouk', latitude: 36.4601, longitude: 7.4321 },
  { id: 'g-stop-10', wilayaId: 24, name: 'Héliopolis Centre', latitude: 36.4518, longitude: 7.4629 },
  { id: 'g-stop-11', wilayaId: 24, name: 'Héliopolis Lycée', latitude: 36.4479, longitude: 7.4683 },
  { id: 'g-stop-12', wilayaId: 24, name: 'Zone Industrielle Héliopolis', latitude: 36.4426, longitude: 7.4744 },
  { id: 'g-stop-13', wilayaId: 24, name: 'Hammam Debagh Centre', latitude: 36.5038, longitude: 7.3684 },
  { id: 'g-stop-14', wilayaId: 24, name: 'Hammam Debagh Source', latitude: 36.5112, longitude: 7.3559 },
  { id: 'g-stop-15', wilayaId: 24, name: 'Belkheir', latitude: 36.4824, longitude: 7.3968 },
  { id: 'g-stop-16', wilayaId: 24, name: 'Oued Zenati Gare', latitude: 36.4725, longitude: 7.4096 },
  { id: 'g-stop-17', wilayaId: 24, name: 'Sidi Ahmed', latitude: 36.4688, longitude: 7.4167 },
  { id: 'g-stop-18', wilayaId: 24, name: 'Bouchegouf Centre', latitude: 36.4802, longitude: 7.5187 },
  { id: 'g-stop-19', wilayaId: 24, name: 'Ain Ben Beida', latitude: 36.4709, longitude: 7.4888 },
  { id: 'g-stop-20', wilayaId: 24, name: 'Oued Fragha', latitude: 36.4604, longitude: 7.4595 },
  { id: 'g-stop-21', wilayaId: 24, name: 'Ain Makhlouf Centre', latitude: 36.4019, longitude: 7.2528 },
  { id: 'g-stop-22', wilayaId: 24, name: 'Beni Mezline', latitude: 36.4285, longitude: 7.3097 },
  { id: 'g-stop-23', wilayaId: 24, name: 'Souidani Boudjemaa', latitude: 36.4474, longitude: 7.3662 },
  { id: 'g-stop-24', wilayaId: 24, name: 'Moulin Mahdia', latitude: 36.4387, longitude: 7.3413 },
];

const guelmaRoutes = [
  { id: 'g-route-1', wilayaId: 24, name: 'Ligne 1 - Gare → Héliopolis', bus_number: 'L1', color: ROUTE_COLORS.blue, status: 'active' },
  { id: 'g-route-2', wilayaId: 24, name: 'Ligne 2 - Hammam Debagh → Gare', bus_number: 'L2', color: ROUTE_COLORS.red, status: 'active' },
  { id: 'g-route-3', wilayaId: 24, name: 'Ligne 3 - Bouchegouf → Ain Makhlouf', bus_number: 'L3', color: ROUTE_COLORS.green, status: 'active' },
  { id: 'g-route-4', wilayaId: 24, name: 'Ligne 4 - Université ↔ Cité 1000', bus_number: 'L4', color: ROUTE_COLORS.orange, status: 'active' },
  { id: 'g-route-5', wilayaId: 24, name: 'Ligne 5 - Gare ↔ Hammam Debagh Source', bus_number: 'L5', color: ROUTE_COLORS.blue, status: 'active' },
  { id: 'g-route-6', wilayaId: 24, name: 'Ligne 6 - Centre ↔ Mahdia', bus_number: 'L6', color: ROUTE_COLORS.red, status: 'active' },
];

const guelmaRouteStops = [
  ...['g-stop-01', 'g-stop-02', 'g-stop-09', 'g-stop-07', 'g-stop-08', 'g-stop-10', 'g-stop-11', 'g-stop-12'].map((stopId, idx) => ({ route_id: 'g-route-1', stop_id: stopId, order_index: idx })),
  ...['g-stop-13', 'g-stop-15', 'g-stop-16', 'g-stop-17', 'g-stop-06', 'g-stop-01'].map((stopId, idx) => ({ route_id: 'g-route-2', stop_id: stopId, order_index: idx })),
  ...['g-stop-18', 'g-stop-19', 'g-stop-20', 'g-stop-10', 'g-stop-23', 'g-stop-22', 'g-stop-21'].map((stopId, idx) => ({ route_id: 'g-route-3', stop_id: stopId, order_index: idx })),
  ...['g-stop-05', 'g-stop-04', 'g-stop-03', 'g-stop-02', 'g-stop-06', 'g-stop-17'].map((stopId, idx) => ({ route_id: 'g-route-4', stop_id: stopId, order_index: idx })),
  ...['g-stop-01', 'g-stop-06', 'g-stop-17', 'g-stop-16', 'g-stop-15', 'g-stop-13', 'g-stop-14'].map((stopId, idx) => ({ route_id: 'g-route-5', stop_id: stopId, order_index: idx })),
  ...['g-stop-02', 'g-stop-09', 'g-stop-23', 'g-stop-24', 'g-stop-22', 'g-stop-21'].map((stopId, idx) => ({ route_id: 'g-route-6', stop_id: stopId, order_index: idx })),
];

const guelmaBuses = [
  { id: 'g-bus-01', wilayaId: 24, bus_number: 'GM-101', route_id: 'g-route-1', status: 'active' },
  { id: 'g-bus-02', wilayaId: 24, bus_number: 'GM-102', route_id: 'g-route-2', status: 'active' },
  { id: 'g-bus-03', wilayaId: 24, bus_number: 'GM-103', route_id: 'g-route-3', status: 'active' },
  { id: 'g-bus-04', wilayaId: 24, bus_number: 'GM-104', route_id: 'g-route-4', status: 'active' },
  { id: 'g-bus-05', wilayaId: 24, bus_number: 'GM-105', route_id: 'g-route-5', status: 'active' },
  { id: 'g-bus-06', wilayaId: 24, bus_number: 'GM-106', route_id: 'g-route-6', status: 'active' },
];

const guelmaRatings = [
  { id: 'g-rating-1', route_id: 'g-route-1', user_name: 'Amine', rating: 4, comment: 'Connexion rapide vers Héliopolis.', created_at: '2026-03-12T08:15:00Z' },
  { id: 'g-rating-2', route_id: 'g-route-3', user_name: 'Sara', rating: 5, comment: 'Pratique pour Ain Makhlouf.', created_at: '2026-03-15T10:30:00Z' },
  { id: 'g-rating-3', route_id: 'g-route-5', user_name: 'Nour', rating: 3, comment: 'Fréquence correcte en journée.', created_at: '2026-03-18T16:45:00Z' },
];

export const demoTransportByWilaya = {
  24: {
    routes: guelmaRoutes,
    stops: guelmaStops,
    routeStops: guelmaRouteStops,
    buses: guelmaBuses,
    ratings: guelmaRatings,
    suggestions: [],
  },
};

export function getDemoTransportData(wilayaId = DEFAULT_WILAYA_ID) {
  const data = demoTransportByWilaya[Number(wilayaId)];
  if (data) {
    return {
      routes: [...data.routes],
      stops: [...data.stops],
      routeStops: [...data.routeStops],
      buses: [...data.buses],
      ratings: [...data.ratings],
      suggestions: [...data.suggestions],
    };
  }

  return {
    routes: [],
    stops: [],
    routeStops: [],
    buses: [],
    ratings: [],
    suggestions: [],
  };
}
