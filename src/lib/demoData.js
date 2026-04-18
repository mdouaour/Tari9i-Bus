import { ALGERIAN_WILAYAS } from '../core/services/wilayas';
import { getDemoTransportData } from '../core/services/demoData';

const guelmaData = getDemoTransportData(24);

export const ALGERIA_CITIES = ALGERIAN_WILAYAS;
export const demoRoutes = guelmaData.routes;
export const demoStops = guelmaData.stops;
export const demoRouteStops = guelmaData.routeStops;
export const demoBuses = guelmaData.buses;
export const demoRatings = guelmaData.ratings;
