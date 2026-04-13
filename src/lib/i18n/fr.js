const fr = {
  // App
  appName: 'TARIQI Bus',

  // Navigation
  navMap: 'Carte',
  navSearch: 'Recherche',
  navRoutes: 'Lignes',
  navRatings: 'Avis',
  navAdmin: 'Admin',
  toggleDarkMode: 'Basculer le mode sombre',
  toggleMenu: 'Basculer le menu',

  // City
  city: 'Ville',
  allCities: 'Toutes les villes d\'Algérie',
  selectCity: 'Choisir une ville...',
  cityTransportNetwork: 'Réseau de transport de {city}',
  algeriaTransportNetwork: 'Réseau de transport public algérien',
  routesInCity: 'Lignes de bus à {city}',
  routesInAllCities: 'Toutes les lignes de bus en Algérie',
  noRoutesInCity: 'Aucune ligne dans cette ville pour l\'instant.',

  // Map page
  busRoutes: 'Lignes de Bus',
  algiersTransportNetwork: 'Réseau de transport d\'Algérie',
  showAllRoutes: '← Afficher toutes les lignes',
  stopsCount: '{count} arrêts',
  close: 'Fermer',
  routesButton: '🚌 Lignes',

  // Search
  findYourRoute: 'Trouvez Votre Itinéraire',
  from: 'De',
  to: 'À',
  startLocation: 'Point de départ...',
  destination: 'Destination...',
  selectOnMap: '📍 Carte',
  searchRoutes: 'Rechercher',
  routesFound: '{count} itinéraire(s) trouvé(s)',
  noRoutesFound: 'Aucun itinéraire trouvé',
  tryDifferentLocations: 'Essayez des emplacements différents ou élargissez votre zone de recherche.',
  bestRoute: '✨ Meilleur Itinéraire',
  estimatedTime: '~{time} min',
  kmWalk: '{distance} km à pied',
  walk: '🚶 Marche {distance}km',
  clickMapToSelectOrigin: '👆 Cliquez sur la carte pour sélectionner votre point de départ',
  clickMapToSelectDest: '👆 Cliquez sur la carte pour sélectionner votre destination',

  // Routes page
  allAvailableRoutes: 'Toutes les lignes de bus disponibles à Alger',
  reviews: '⭐ Avis',
  viewOnMap: '🗺️ Voir sur la carte',

  // Ratings
  ratingsAndReviews: 'Notes & Avis',
  shareExperience: 'Partagez votre expérience avec les lignes de bus',
  selectRoute: 'Sélectionner une ligne',
  chooseRoute: 'Choisir une ligne de bus...',
  reviewsCount: '{count} avis',
  leaveReview: 'Laisser un Avis',
  yourName: 'Votre Nom',
  anonymous: 'Anonyme',
  rating: 'Note',
  comment: 'Commentaire',
  commentPlaceholder: 'Partagez votre expérience... (retard, confort, comportement du chauffeur)',
  submitReview: 'Envoyer l\'avis',
  reviewsList: 'Avis ({count})',
  noReviewsYet: 'Aucun avis pour le moment. Soyez le premier !',

  // Admin
  adminDashboard: 'Tableau de Bord Admin',
  manageRoutes: 'Gérer les lignes, arrêts, bus et avis',
  tabRoutes: 'Lignes',
  tabStops: 'Arrêts',
  tabBuses: 'Bus',
  tabTracking: 'Suivi',
  tabComments: 'Commentaires',

  // Route Manager
  createNewRoute: 'Créer une Nouvelle Ligne',
  editRoute: 'Modifier la Ligne',
  routeNamePlaceholder: 'Nom de la ligne (ex: Ligne 1 - Bab Ezzouar → Alger Centre)',
  busNumber: 'Numéro du bus',
  saveChanges: 'Enregistrer',
  createRoute: 'Créer la Ligne',
  addStopToRoute: '+ Ajouter un arrêt',
  selectStop: 'Sélectionner un arrêt...',

  // Stop Manager
  addNewStop: 'Ajouter un Nouvel Arrêt',
  editStop: 'Modifier l\'Arrêt',
  stopName: 'Nom de l\'arrêt',
  latitude: 'Latitude',
  longitude: 'Longitude',
  stopTip: 'Astuce : Utilisez la page carte pour trouver les coordonnées en cliquant sur les emplacements.',
  save: 'Enregistrer',
  addStop: 'Ajouter l\'Arrêt',

  // Bus Manager
  addNewBus: 'Ajouter un Nouveau Bus',
  editBus: 'Modifier le Bus',
  busNumberPlaceholder: 'Numéro du bus (ex: B-006)',
  statusActive: 'Actif',
  statusMaintenance: 'Maintenance',
  statusInactive: 'Inactif',
  noRouteAssigned: 'Aucune ligne assignée',
  addBus: 'Ajouter le Bus',
  noRoute: 'Aucune ligne',

  // Comment Moderator
  commentModeration: 'Modération des Commentaires',
  totalReviews: '{count} avis au total',
  noReviewsToModerate: 'Aucun avis à modérer.',
  routeLabel: 'Ligne : {name}',
  deleteReview: 'Supprimer l\'avis',

  // Tracking
  liveBusTracking: 'Suivi des Bus en Direct',
  simulatedTrackingDesc: 'Suivi simulé (MVP) - positions mises à jour toutes les 5s',
  noActiveBuses: 'Aucun bus actif.',
  nearStop: 'Proche : {name}',
  trackingModeSimulated: '📡 Mode de Suivi : Simulé',
  trackingExplanation: 'Les positions des bus sont simulées à partir des arrêts. Dans les prochaines phases, le suivi GPS réel via l\'application mobile du chauffeur sera disponible.',

  // Map popups
  yourLocation: 'Votre position (Départ)',
  destinationLabel: 'Destination',
  busLabel: 'Bus {number}',
};

export default fr;
