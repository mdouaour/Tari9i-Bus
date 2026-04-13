export const demoRoutes = [
  {
    id: '1',
    name: 'Ligne 1 - Bab Ezzouar → Alger Centre',
    bus_number: '1',
    color: '#ef4444',
    status: 'active',
  },
  {
    id: '2',
    name: 'Ligne 33 - El Harrach → Hussein Dey',
    bus_number: '33',
    color: '#3b82f6',
    status: 'active',
  },
  {
    id: '3',
    name: 'Ligne 74 - Dar El Beida → Kouba',
    bus_number: '74',
    color: '#10b981',
    status: 'active',
  },
  {
    id: '4',
    name: 'Ligne 12 - Ain Naadja → Bachdjerrah',
    bus_number: '12',
    color: '#f59e0b',
    status: 'active',
  },
  {
    id: '5',
    name: 'Ligne 56 - Birkhadem → Rouiba',
    bus_number: '56',
    color: '#8b5cf6',
    status: 'active',
  },
];

export const demoStops = [
  // Route 1 stops
  { id: 's1', name: 'Bab Ezzouar - Université', latitude: 36.7188, longitude: 3.1803, route_ids: ['1'] },
  { id: 's2', name: 'Les Bananiers', latitude: 36.7243, longitude: 3.1560, route_ids: ['1'] },
  { id: 's3', name: 'Mohammadia', latitude: 36.7325, longitude: 3.1280, route_ids: ['1'] },
  { id: 's4', name: 'El Harrach Gare', latitude: 36.7210, longitude: 3.1360, route_ids: ['1', '2'] },
  { id: 's5', name: 'Belfort - Hussein Dey', latitude: 36.7380, longitude: 3.1010, route_ids: ['1', '2'] },
  { id: 's6', name: 'Ruisseau', latitude: 36.7450, longitude: 3.0810, route_ids: ['1'] },
  { id: 's7', name: 'Hamma - Jardin d\'Essai', latitude: 36.7520, longitude: 3.0650, route_ids: ['1'] },
  { id: 's8', name: 'Alger Centre - Grande Poste', latitude: 36.7538, longitude: 3.0588, route_ids: ['1'] },
  // Route 2 stops
  { id: 's9', name: 'El Harrach Centre', latitude: 36.7174, longitude: 3.1353, route_ids: ['2'] },
  { id: 's10', name: 'Oued Smar', latitude: 36.7200, longitude: 3.1190, route_ids: ['2'] },
  { id: 's11', name: 'Cinq Maisons', latitude: 36.7300, longitude: 3.1090, route_ids: ['2'] },
  { id: 's12', name: 'Hussein Dey Centre', latitude: 36.7398, longitude: 3.0970, route_ids: ['2'] },
  // Route 3 stops
  { id: 's13', name: 'Dar El Beida', latitude: 36.7135, longitude: 3.2125, route_ids: ['3'] },
  { id: 's14', name: 'Bab Ezzouar Mall', latitude: 36.7225, longitude: 3.1850, route_ids: ['3'] },
  { id: 's15', name: 'Ain Naadja', latitude: 36.7170, longitude: 3.0890, route_ids: ['3', '4'] },
  { id: 's16', name: 'Kouba Centre', latitude: 36.7264, longitude: 3.0493, route_ids: ['3'] },
  // Route 4 stops
  { id: 's17', name: 'Ain Naadja Gare', latitude: 36.7150, longitude: 3.0870, route_ids: ['4'] },
  { id: 's18', name: 'El Eucalyptus', latitude: 36.7100, longitude: 3.1030, route_ids: ['4'] },
  { id: 's19', name: 'Bachdjerrah Centre', latitude: 36.7260, longitude: 3.1130, route_ids: ['4'] },
  // Route 5 stops
  { id: 's20', name: 'Birkhadem Centre', latitude: 36.7120, longitude: 3.0490, route_ids: ['5'] },
  { id: 's21', name: 'Gué de Constantine', latitude: 36.7050, longitude: 3.0730, route_ids: ['5'] },
  { id: 's22', name: 'Baraki', latitude: 36.6750, longitude: 3.0890, route_ids: ['5'] },
  { id: 's23', name: 'Les Eucalyptus', latitude: 36.6800, longitude: 3.1300, route_ids: ['5'] },
  { id: 's24', name: 'Rouiba Centre', latitude: 36.7330, longitude: 3.2810, route_ids: ['5'] },
];

export const demoRouteStops = [
  // Route 1
  { route_id: '1', stop_id: 's1', order_index: 0 },
  { route_id: '1', stop_id: 's2', order_index: 1 },
  { route_id: '1', stop_id: 's3', order_index: 2 },
  { route_id: '1', stop_id: 's4', order_index: 3 },
  { route_id: '1', stop_id: 's5', order_index: 4 },
  { route_id: '1', stop_id: 's6', order_index: 5 },
  { route_id: '1', stop_id: 's7', order_index: 6 },
  { route_id: '1', stop_id: 's8', order_index: 7 },
  // Route 2
  { route_id: '2', stop_id: 's9', order_index: 0 },
  { route_id: '2', stop_id: 's4', order_index: 1 },
  { route_id: '2', stop_id: 's10', order_index: 2 },
  { route_id: '2', stop_id: 's11', order_index: 3 },
  { route_id: '2', stop_id: 's5', order_index: 4 },
  { route_id: '2', stop_id: 's12', order_index: 5 },
  // Route 3
  { route_id: '3', stop_id: 's13', order_index: 0 },
  { route_id: '3', stop_id: 's14', order_index: 1 },
  { route_id: '3', stop_id: 's15', order_index: 2 },
  { route_id: '3', stop_id: 's16', order_index: 3 },
  // Route 4
  { route_id: '4', stop_id: 's17', order_index: 0 },
  { route_id: '4', stop_id: 's18', order_index: 1 },
  { route_id: '4', stop_id: 's19', order_index: 2 },
  // Route 5
  { route_id: '5', stop_id: 's20', order_index: 0 },
  { route_id: '5', stop_id: 's21', order_index: 1 },
  { route_id: '5', stop_id: 's22', order_index: 2 },
  { route_id: '5', stop_id: 's23', order_index: 3 },
  { route_id: '5', stop_id: 's24', order_index: 4 },
];

export const demoBuses = [
  { id: 'b1', bus_number: 'B-001', status: 'active', route_id: '1' },
  { id: 'b2', bus_number: 'B-002', status: 'active', route_id: '2' },
  { id: 'b3', bus_number: 'B-003', status: 'active', route_id: '3' },
  { id: 'b4', bus_number: 'B-004', status: 'maintenance', route_id: '4' },
  { id: 'b5', bus_number: 'B-005', status: 'active', route_id: '5' },
];

export const demoRatings = [
  { id: 'r1', user_name: 'Ahmed', route_id: '1', rating: 4, comment: 'Service fiable, bus régulier.', created_at: '2025-03-10T08:30:00Z' },
  { id: 'r2', user_name: 'Fatima', route_id: '1', rating: 3, comment: 'Parfois en retard le matin.', created_at: '2025-03-11T14:20:00Z' },
  { id: 'r3', user_name: 'Karim', route_id: '2', rating: 5, comment: 'Excellent service, chauffeur professionnel.', created_at: '2025-03-12T09:15:00Z' },
  { id: 'r4', user_name: 'Sara', route_id: '3', rating: 2, comment: 'Bus trop bondé aux heures de pointe.', created_at: '2025-03-13T17:45:00Z' },
  { id: 'r5', user_name: 'Mohamed', route_id: '5', rating: 4, comment: 'Bon trajet, prix raisonnable.', created_at: '2025-03-14T11:00:00Z' },
];
