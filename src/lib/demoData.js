// ============================================================
// ALGERIA CITIES — major cities with map center + zoom
// ============================================================
export const ALGERIA_CITIES = [
  { id: 'guelma',     name: 'Guelma',     nameAr: 'قالمة',       lat: 36.4622, lng:  7.4267, zoom: 13 },
  { id: 'alger',      name: 'Alger',      nameAr: 'الجزائر',     lat: 36.7538, lng:  3.0588, zoom: 12 },
  { id: 'oran',       name: 'Oran',       nameAr: 'وهران',       lat: 35.6969, lng: -0.6331, zoom: 13 },
  { id: 'constantine',name: 'Constantine',nameAr: 'قسنطينة',     lat: 36.3650, lng:  6.6147, zoom: 13 },
  { id: 'annaba',     name: 'Annaba',     nameAr: 'عنابة',       lat: 36.9000, lng:  7.7667, zoom: 13 },
  { id: 'blida',      name: 'Blida',      nameAr: 'البليدة',     lat: 36.4700, lng:  2.8278, zoom: 13 },
  { id: 'setif',      name: 'Sétif',      nameAr: 'سطيف',        lat: 36.1898, lng:  5.4128, zoom: 13 },
  { id: 'tlemcen',    name: 'Tlemcen',    nameAr: 'تلمسان',      lat: 34.8828, lng: -1.3151, zoom: 13 },
  { id: 'bejaia',     name: 'Béjaïa',     nameAr: 'بجاية',       lat: 36.7520, lng:  5.0567, zoom: 13 },
  { id: 'batna',      name: 'Batna',      nameAr: 'باتنة',       lat: 35.5550, lng:  6.1740, zoom: 13 },
  { id: 'biskra',     name: 'Biskra',     nameAr: 'بسكرة',       lat: 34.8500, lng:  5.7333, zoom: 13 },
];

// ============================================================
// ROUTES
// ============================================================
export const demoRoutes = [
  // ── Guelma ─────────────────────────────────────────────────
  { id: '16', city: 'guelma', name: 'Ligne 1 - Centre Guelma → Héliopolis', bus_number: '1',  color: '#ef4444', status: 'active' },
  { id: '17', city: 'guelma', name: 'Ligne 2 - Hammam Debagh → Guelma Gare', bus_number: '2', color: '#3b82f6', status: 'active' },
  { id: '18', city: 'guelma', name: 'Ligne 3 - Bouchegouf → Ain Makhlouf',   bus_number: '3', color: '#10b981', status: 'active' },
  // ── Alger ──────────────────────────────────────────────────
  { id: '1', city: 'alger', name: 'Ligne 1 - Bab Ezzouar → Alger Centre', bus_number: '1',  color: '#ef4444', status: 'active' },
  { id: '2', city: 'alger', name: 'Ligne 33 - El Harrach → Hussein Dey',  bus_number: '33', color: '#3b82f6', status: 'active' },
  { id: '3', city: 'alger', name: 'Ligne 74 - Dar El Beida → Kouba',      bus_number: '74', color: '#10b981', status: 'active' },
  { id: '4', city: 'alger', name: 'Ligne 12 - Ain Naadja → Bachdjerrah',  bus_number: '12', color: '#f59e0b', status: 'active' },
  { id: '5', city: 'alger', name: 'Ligne 56 - Birkhadem → Rouiba',        bus_number: '56', color: '#8b5cf6', status: 'active' },
  // ── Oran ───────────────────────────────────────────────────
  { id: '6',  city: 'oran', name: 'Ligne 1 - Centre-Ville → Es Sénia',    bus_number: '1',  color: '#ef4444', status: 'active' },
  { id: '7',  city: 'oran', name: 'Ligne 2 - Saint-Pierre → Bir El Djir', bus_number: '2',  color: '#3b82f6', status: 'active' },
  { id: '8',  city: 'oran', name: 'Ligne 5 - USTO → Hai Fellaoucene',     bus_number: '5',  color: '#10b981', status: 'active' },
  // ── Constantine ────────────────────────────────────────────
  { id: '9',  city: 'constantine', name: 'Ligne 1 - Ben Badis → Ain Smara',   bus_number: '1',  color: '#ef4444', status: 'active' },
  { id: '10', city: 'constantine', name: 'Ligne 3 - Sarkina → Zighoud Youcef',bus_number: '3',  color: '#f59e0b', status: 'active' },
  // ── Annaba ─────────────────────────────────────────────────
  { id: '11', city: 'annaba', name: 'Ligne 1 - Gare → Sidi Achour',     bus_number: '1',  color: '#ef4444', status: 'active' },
  { id: '12', city: 'annaba', name: 'Ligne 4 - El Bouni → El Hadjar',   bus_number: '4',  color: '#8b5cf6', status: 'active' },
  // ── Blida ──────────────────────────────────────────────────
  { id: '13', city: 'blida', name: 'Ligne 1 - Centre Blida → Boufarik', bus_number: '1',  color: '#ef4444', status: 'active' },
  { id: '14', city: 'blida', name: 'Ligne 2 - Beni Mered → Ouled Yaich',bus_number: '2',  color: '#3b82f6', status: 'active' },
  // ── Sétif ──────────────────────────────────────────────────
  { id: '15', city: 'setif', name: 'Ligne 1 - Centre Sétif → Ain Arnat',bus_number: '1',  color: '#ef4444', status: 'active' },
];

// ============================================================
// STOPS
// ============================================================
export const demoStops = [
  // ── Guelma — Route 16 ──────────────────────────────────────
  { id: 'sg1', city: 'guelma', name: 'Place du 8 Mai 1945',        latitude: 36.4622, longitude: 7.4267, route_ids: ['16'] },
  { id: 'sg2', city: 'guelma', name: 'Hôpital Sébastopol',         latitude: 36.4650, longitude: 7.4310, route_ids: ['16'] },
  { id: 'sg3', city: 'guelma', name: 'Hay Bouakal',                 latitude: 36.4590, longitude: 7.4380, route_ids: ['16'] },
  { id: 'sg4', city: 'guelma', name: 'Héliopolis',                  latitude: 36.4520, longitude: 7.4630, route_ids: ['16'] },
  // ── Guelma — Route 17 ──────────────────────────────────────
  { id: 'sg5', city: 'guelma', name: 'Hammam Debagh',               latitude: 36.5050, longitude: 7.3700, route_ids: ['17'] },
  { id: 'sg6', city: 'guelma', name: 'Oued Zenati',                 latitude: 36.4830, longitude: 7.3960, route_ids: ['17'] },
  { id: 'sg7', city: 'guelma', name: 'Cité 1000 Logements',         latitude: 36.4700, longitude: 7.4200, route_ids: ['17'] },
  { id: 'sg8', city: 'guelma', name: 'Guelma Gare Routière',        latitude: 36.4600, longitude: 7.4240, route_ids: ['17'] },
  // ── Guelma — Route 18 ──────────────────────────────────────
  { id: 'sg9',  city: 'guelma', name: 'Bouchegouf',                 latitude: 36.4800, longitude: 7.5190, route_ids: ['18'] },
  { id: 'sg10', city: 'guelma', name: 'Ain Ben Beida',              latitude: 36.4710, longitude: 7.4890, route_ids: ['18'] },
  { id: 'sg11', city: 'guelma', name: 'Ain Makhlouf',               latitude: 36.4020, longitude: 7.2530, route_ids: ['18'] },
  // ── Alger — Route 1 ────────────────────────────────────────
  { id: 's1',  city: 'alger', name: 'Bab Ezzouar - Université',   latitude: 36.7188, longitude:  3.1803, route_ids: ['1'] },
  { id: 's2',  city: 'alger', name: 'Les Bananiers',              latitude: 36.7243, longitude:  3.1560, route_ids: ['1'] },
  { id: 's3',  city: 'alger', name: 'Mohammadia',                 latitude: 36.7325, longitude:  3.1280, route_ids: ['1'] },
  { id: 's4',  city: 'alger', name: 'El Harrach Gare',            latitude: 36.7210, longitude:  3.1360, route_ids: ['1', '2'] },
  { id: 's5',  city: 'alger', name: 'Belfort - Hussein Dey',      latitude: 36.7380, longitude:  3.1010, route_ids: ['1', '2'] },
  { id: 's6',  city: 'alger', name: 'Ruisseau',                   latitude: 36.7450, longitude:  3.0810, route_ids: ['1'] },
  { id: 's7',  city: 'alger', name: 'Hamma - Jardin d\'Essai',    latitude: 36.7520, longitude:  3.0650, route_ids: ['1'] },
  { id: 's8',  city: 'alger', name: 'Alger Centre - Grande Poste',latitude: 36.7538, longitude:  3.0588, route_ids: ['1'] },
  // ── Alger — Route 2 ────────────────────────────────────────
  { id: 's9',  city: 'alger', name: 'El Harrach Centre',          latitude: 36.7174, longitude:  3.1353, route_ids: ['2'] },
  { id: 's10', city: 'alger', name: 'Oued Smar',                  latitude: 36.7200, longitude:  3.1190, route_ids: ['2'] },
  { id: 's11', city: 'alger', name: 'Cinq Maisons',               latitude: 36.7300, longitude:  3.1090, route_ids: ['2'] },
  { id: 's12', city: 'alger', name: 'Hussein Dey Centre',         latitude: 36.7398, longitude:  3.0970, route_ids: ['2'] },
  // ── Alger — Route 3 ────────────────────────────────────────
  { id: 's13', city: 'alger', name: 'Dar El Beida',               latitude: 36.7135, longitude:  3.2125, route_ids: ['3'] },
  { id: 's14', city: 'alger', name: 'Bab Ezzouar Mall',           latitude: 36.7225, longitude:  3.1850, route_ids: ['3'] },
  { id: 's15', city: 'alger', name: 'Ain Naadja',                 latitude: 36.7170, longitude:  3.0890, route_ids: ['3', '4'] },
  { id: 's16', city: 'alger', name: 'Kouba Centre',               latitude: 36.7264, longitude:  3.0493, route_ids: ['3'] },
  // ── Alger — Route 4 ────────────────────────────────────────
  { id: 's17', city: 'alger', name: 'Ain Naadja Gare',            latitude: 36.7150, longitude:  3.0870, route_ids: ['4'] },
  { id: 's18', city: 'alger', name: 'El Eucalyptus',              latitude: 36.7100, longitude:  3.1030, route_ids: ['4'] },
  { id: 's19', city: 'alger', name: 'Bachdjerrah Centre',         latitude: 36.7260, longitude:  3.1130, route_ids: ['4'] },
  // ── Alger — Route 5 ────────────────────────────────────────
  { id: 's20', city: 'alger', name: 'Birkhadem Centre',           latitude: 36.7120, longitude:  3.0490, route_ids: ['5'] },
  { id: 's21', city: 'alger', name: 'Gué de Constantine',         latitude: 36.7050, longitude:  3.0730, route_ids: ['5'] },
  { id: 's22', city: 'alger', name: 'Baraki',                     latitude: 36.6750, longitude:  3.0890, route_ids: ['5'] },
  { id: 's23', city: 'alger', name: 'Les Eucalyptus',             latitude: 36.6800, longitude:  3.1300, route_ids: ['5'] },
  { id: 's24', city: 'alger', name: 'Rouiba Centre',              latitude: 36.7330, longitude:  3.2810, route_ids: ['5'] },
  // ── Oran — Route 6 ─────────────────────────────────────────
  { id: 's25', city: 'oran', name: 'Place du 1er Novembre',       latitude: 35.6969, longitude: -0.6331, route_ids: ['6'] },
  { id: 's26', city: 'oran', name: 'Plateau - Oran',              latitude: 35.6940, longitude: -0.6190, route_ids: ['6'] },
  { id: 's27', city: 'oran', name: 'Gambetta',                    latitude: 35.7010, longitude: -0.6040, route_ids: ['6'] },
  { id: 's28', city: 'oran', name: 'Sidi El Houari',              latitude: 35.7060, longitude: -0.5920, route_ids: ['6'] },
  { id: 's29', city: 'oran', name: 'Es Sénia',                    latitude: 35.6720, longitude: -0.6050, route_ids: ['6'] },
  // ── Oran — Route 7 ─────────────────────────────────────────
  { id: 's30', city: 'oran', name: 'Saint-Pierre',                latitude: 35.7100, longitude: -0.6400, route_ids: ['7'] },
  { id: 's31', city: 'oran', name: 'Front de Mer',                latitude: 35.7200, longitude: -0.6180, route_ids: ['7'] },
  { id: 's32', city: 'oran', name: 'Port d\'Oran',                latitude: 35.7180, longitude: -0.6050, route_ids: ['7'] },
  { id: 's33', city: 'oran', name: 'Bir El Djir',                 latitude: 35.7280, longitude: -0.5790, route_ids: ['7'] },
  // ── Oran — Route 8 ─────────────────────────────────────────
  { id: 's34', city: 'oran', name: 'USTO Campus',                 latitude: 35.7010, longitude: -0.5980, route_ids: ['8'] },
  { id: 's35', city: 'oran', name: 'Hai Fellaoucene',             latitude: 35.6880, longitude: -0.5750, route_ids: ['8'] },
  { id: 's36', city: 'oran', name: 'El Kerma',                    latitude: 35.6750, longitude: -0.5600, route_ids: ['8'] },
  // ── Constantine — Route 9 ──────────────────────────────────
  { id: 's37', city: 'constantine', name: 'Place Ben Badis',      latitude: 36.3650, longitude:  6.6147, route_ids: ['9'] },
  { id: 's38', city: 'constantine', name: 'Coudiat',              latitude: 36.3720, longitude:  6.6200, route_ids: ['9'] },
  { id: 's39', city: 'constantine', name: 'Benbadis Gare',        latitude: 36.3620, longitude:  6.6290, route_ids: ['9'] },
  { id: 's40', city: 'constantine', name: 'Ain Smara',            latitude: 36.3900, longitude:  6.6800, route_ids: ['9'] },
  // ── Constantine — Route 10 ─────────────────────────────────
  { id: 's41', city: 'constantine', name: 'Sarkina',              latitude: 36.3420, longitude:  6.6100, route_ids: ['10'] },
  { id: 's42', city: 'constantine', name: 'Oued El Had',          latitude: 36.3480, longitude:  6.6050, route_ids: ['10'] },
  { id: 's43', city: 'constantine', name: 'Zighoud Youcef',       latitude: 36.3550, longitude:  6.5980, route_ids: ['10'] },
  // ── Annaba — Route 11 ──────────────────────────────────────
  { id: 's44', city: 'annaba', name: 'Gare d\'Annaba',            latitude: 36.9000, longitude:  7.7667, route_ids: ['11'] },
  { id: 's45', city: 'annaba', name: 'Centre-ville Annaba',       latitude: 36.9050, longitude:  7.7750, route_ids: ['11'] },
  { id: 's46', city: 'annaba', name: 'Place du 1er Novembre',     latitude: 36.8980, longitude:  7.7680, route_ids: ['11'] },
  { id: 's47', city: 'annaba', name: 'Sidi Achour',               latitude: 36.8800, longitude:  7.7900, route_ids: ['11'] },
  // ── Annaba — Route 12 ──────────────────────────────────────
  { id: 's48', city: 'annaba', name: 'El Bouni',                  latitude: 36.9010, longitude:  7.8200, route_ids: ['12'] },
  { id: 's49', city: 'annaba', name: 'Route de Ranem',            latitude: 36.9110, longitude:  7.8500, route_ids: ['12'] },
  { id: 's50', city: 'annaba', name: 'El Hadjar',                 latitude: 36.9200, longitude:  7.8800, route_ids: ['12'] },
  // ── Blida — Route 13 ───────────────────────────────────────
  { id: 's51', city: 'blida', name: 'Place Amirouche - Blida',    latitude: 36.4700, longitude:  2.8278, route_ids: ['13'] },
  { id: 's52', city: 'blida', name: 'Ouled Yaich',                latitude: 36.4620, longitude:  2.8400, route_ids: ['13'] },
  { id: 's53', city: 'blida', name: 'Ben Khellil',                latitude: 36.4520, longitude:  2.8850, route_ids: ['13'] },
  { id: 's54', city: 'blida', name: 'Boufarik',                   latitude: 36.4400, longitude:  2.9200, route_ids: ['13'] },
  // ── Blida — Route 14 ───────────────────────────────────────
  { id: 's55', city: 'blida', name: 'Beni Mered',                 latitude: 36.5100, longitude:  2.8800, route_ids: ['14'] },
  { id: 's56', city: 'blida', name: 'Chiffa',                     latitude: 36.4880, longitude:  2.8600, route_ids: ['14'] },
  { id: 's57', city: 'blida', name: 'Ouled Yaich Centre',         latitude: 36.4650, longitude:  2.8450, route_ids: ['14'] },
  // ── Sétif — Route 15 ───────────────────────────────────────
  { id: 's58', city: 'setif', name: 'Place de l\'Indépendance',   latitude: 36.1898, longitude:  5.4128, route_ids: ['15'] },
  { id: 's59', city: 'setif', name: 'Hai El Hidhab',              latitude: 36.1950, longitude:  5.4270, route_ids: ['15'] },
  { id: 's60', city: 'setif', name: 'Ain Arnat',                  latitude: 36.1800, longitude:  5.4800, route_ids: ['15'] },
];

// ============================================================
// ROUTE STOPS (ordered)
// ============================================================
export const demoRouteStops = [
  // Route 16 — Guelma
  { route_id: '16', stop_id: 'sg1', order_index: 0 },
  { route_id: '16', stop_id: 'sg2', order_index: 1 },
  { route_id: '16', stop_id: 'sg3', order_index: 2 },
  { route_id: '16', stop_id: 'sg4', order_index: 3 },
  // Route 17 — Guelma
  { route_id: '17', stop_id: 'sg5', order_index: 0 },
  { route_id: '17', stop_id: 'sg6', order_index: 1 },
  { route_id: '17', stop_id: 'sg7', order_index: 2 },
  { route_id: '17', stop_id: 'sg8', order_index: 3 },
  // Route 18 — Guelma
  { route_id: '18', stop_id: 'sg9',  order_index: 0 },
  { route_id: '18', stop_id: 'sg10', order_index: 1 },
  { route_id: '18', stop_id: 'sg11', order_index: 2 },
  // Route 1 — Alger
  { route_id: '1', stop_id: 's1', order_index: 0 },
  { route_id: '1', stop_id: 's2', order_index: 1 },
  { route_id: '1', stop_id: 's3', order_index: 2 },
  { route_id: '1', stop_id: 's4', order_index: 3 },
  { route_id: '1', stop_id: 's5', order_index: 4 },
  { route_id: '1', stop_id: 's6', order_index: 5 },
  { route_id: '1', stop_id: 's7', order_index: 6 },
  { route_id: '1', stop_id: 's8', order_index: 7 },
  // Route 2 — Alger
  { route_id: '2', stop_id: 's9',  order_index: 0 },
  { route_id: '2', stop_id: 's4',  order_index: 1 },
  { route_id: '2', stop_id: 's10', order_index: 2 },
  { route_id: '2', stop_id: 's11', order_index: 3 },
  { route_id: '2', stop_id: 's5',  order_index: 4 },
  { route_id: '2', stop_id: 's12', order_index: 5 },
  // Route 3 — Alger
  { route_id: '3', stop_id: 's13', order_index: 0 },
  { route_id: '3', stop_id: 's14', order_index: 1 },
  { route_id: '3', stop_id: 's15', order_index: 2 },
  { route_id: '3', stop_id: 's16', order_index: 3 },
  // Route 4 — Alger
  { route_id: '4', stop_id: 's17', order_index: 0 },
  { route_id: '4', stop_id: 's18', order_index: 1 },
  { route_id: '4', stop_id: 's19', order_index: 2 },
  // Route 5 — Alger
  { route_id: '5', stop_id: 's20', order_index: 0 },
  { route_id: '5', stop_id: 's21', order_index: 1 },
  { route_id: '5', stop_id: 's22', order_index: 2 },
  { route_id: '5', stop_id: 's23', order_index: 3 },
  { route_id: '5', stop_id: 's24', order_index: 4 },
  // Route 6 — Oran
  { route_id: '6', stop_id: 's25', order_index: 0 },
  { route_id: '6', stop_id: 's26', order_index: 1 },
  { route_id: '6', stop_id: 's27', order_index: 2 },
  { route_id: '6', stop_id: 's28', order_index: 3 },
  { route_id: '6', stop_id: 's29', order_index: 4 },
  // Route 7 — Oran
  { route_id: '7', stop_id: 's30', order_index: 0 },
  { route_id: '7', stop_id: 's31', order_index: 1 },
  { route_id: '7', stop_id: 's32', order_index: 2 },
  { route_id: '7', stop_id: 's33', order_index: 3 },
  // Route 8 — Oran
  { route_id: '8', stop_id: 's34', order_index: 0 },
  { route_id: '8', stop_id: 's35', order_index: 1 },
  { route_id: '8', stop_id: 's36', order_index: 2 },
  // Route 9 — Constantine
  { route_id: '9', stop_id: 's37', order_index: 0 },
  { route_id: '9', stop_id: 's38', order_index: 1 },
  { route_id: '9', stop_id: 's39', order_index: 2 },
  { route_id: '9', stop_id: 's40', order_index: 3 },
  // Route 10 — Constantine
  { route_id: '10', stop_id: 's41', order_index: 0 },
  { route_id: '10', stop_id: 's42', order_index: 1 },
  { route_id: '10', stop_id: 's43', order_index: 2 },
  // Route 11 — Annaba
  { route_id: '11', stop_id: 's44', order_index: 0 },
  { route_id: '11', stop_id: 's45', order_index: 1 },
  { route_id: '11', stop_id: 's46', order_index: 2 },
  { route_id: '11', stop_id: 's47', order_index: 3 },
  // Route 12 — Annaba
  { route_id: '12', stop_id: 's48', order_index: 0 },
  { route_id: '12', stop_id: 's49', order_index: 1 },
  { route_id: '12', stop_id: 's50', order_index: 2 },
  // Route 13 — Blida
  { route_id: '13', stop_id: 's51', order_index: 0 },
  { route_id: '13', stop_id: 's52', order_index: 1 },
  { route_id: '13', stop_id: 's53', order_index: 2 },
  { route_id: '13', stop_id: 's54', order_index: 3 },
  // Route 14 — Blida
  { route_id: '14', stop_id: 's55', order_index: 0 },
  { route_id: '14', stop_id: 's56', order_index: 1 },
  { route_id: '14', stop_id: 's57', order_index: 2 },
  // Route 15 — Sétif
  { route_id: '15', stop_id: 's58', order_index: 0 },
  { route_id: '15', stop_id: 's59', order_index: 1 },
  { route_id: '15', stop_id: 's60', order_index: 2 },
];

// ============================================================
// BUSES
// ============================================================
export const demoBuses = [
  // Guelma
  { id: 'b16', city: 'guelma', bus_number: 'GM-001', status: 'active',      route_id: '16' },
  { id: 'b17', city: 'guelma', bus_number: 'GM-002', status: 'active',      route_id: '17' },
  { id: 'b18', city: 'guelma', bus_number: 'GM-003', status: 'maintenance', route_id: '18' },
  // Alger
  { id: 'b1', city: 'alger', bus_number: 'AL-001', status: 'active',      route_id: '1' },
  { id: 'b2', city: 'alger', bus_number: 'AL-002', status: 'active',      route_id: '2' },
  { id: 'b3', city: 'alger', bus_number: 'AL-003', status: 'active',      route_id: '3' },
  { id: 'b4', city: 'alger', bus_number: 'AL-004', status: 'maintenance', route_id: '4' },
  { id: 'b5', city: 'alger', bus_number: 'AL-005', status: 'active',      route_id: '5' },
  // Oran
  { id: 'b6', city: 'oran', bus_number: 'OR-001', status: 'active',       route_id: '6' },
  { id: 'b7', city: 'oran', bus_number: 'OR-002', status: 'active',       route_id: '7' },
  { id: 'b8', city: 'oran', bus_number: 'OR-003', status: 'maintenance',  route_id: '8' },
  // Constantine
  { id: 'b9',  city: 'constantine', bus_number: 'CO-001', status: 'active', route_id: '9'  },
  { id: 'b10', city: 'constantine', bus_number: 'CO-002', status: 'active', route_id: '10' },
  // Annaba
  { id: 'b11', city: 'annaba', bus_number: 'AN-001', status: 'active',    route_id: '11' },
  { id: 'b12', city: 'annaba', bus_number: 'AN-002', status: 'active',    route_id: '12' },
  // Blida
  { id: 'b13', city: 'blida', bus_number: 'BL-001', status: 'active',     route_id: '13' },
  { id: 'b14', city: 'blida', bus_number: 'BL-002', status: 'inactive',   route_id: '14' },
  // Sétif
  { id: 'b15', city: 'setif', bus_number: 'SE-001', status: 'active',     route_id: '15' },
];

// ============================================================
// RATINGS
// ============================================================
export const demoRatings = [
  { id: 'r1', user_name: 'Ahmed',   route_id: '1',  rating: 4, comment: 'Service fiable, bus régulier.',             created_at: '2025-03-10T08:30:00Z' },
  { id: 'r2', user_name: 'Fatima',  route_id: '1',  rating: 3, comment: 'Parfois en retard le matin.',               created_at: '2025-03-11T14:20:00Z' },
  { id: 'r3', user_name: 'Karim',   route_id: '2',  rating: 5, comment: 'Excellent service, chauffeur professionnel.',created_at: '2025-03-12T09:15:00Z' },
  { id: 'r4', user_name: 'Sara',    route_id: '3',  rating: 2, comment: 'Bus trop bondé aux heures de pointe.',       created_at: '2025-03-13T17:45:00Z' },
  { id: 'r5', user_name: 'Mohamed', route_id: '5',  rating: 4, comment: 'Bon trajet, prix raisonnable.',              created_at: '2025-03-14T11:00:00Z' },
  { id: 'r6', user_name: 'Amina',   route_id: '6',  rating: 4, comment: 'Ligne rapide, bon confort.',                 created_at: '2025-03-15T07:30:00Z' },
  { id: 'r7', user_name: 'Youcef',  route_id: '9',  rating: 3, comment: 'Horaires irréguliers parfois.',              created_at: '2025-03-16T12:00:00Z' },
  { id: 'r8', user_name: 'Nadia',   route_id: '11', rating: 5, comment: 'Très bon service à Annaba.',                 created_at: '2025-03-17T08:00:00Z' },
  { id: 'r9',  user_name: 'Salim',  route_id: '16', rating: 4, comment: 'Ligne pratique pour le centre-ville.',      created_at: '2025-03-18T09:00:00Z' },
  { id: 'r10', user_name: 'Meriem', route_id: '17', rating: 5, comment: 'Très ponctuel depuis Hammam Debagh.',        created_at: '2025-03-19T07:45:00Z' },
  { id: 'r11', user_name: 'Hichem', route_id: '18', rating: 3, comment: 'Trajet long mais correct.',                  created_at: '2025-03-20T13:30:00Z' },
];
