import { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useAppStore from '../../store/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';
import { ALGERIA_CITIES } from '../../lib/demoData';

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function createStopIcon(color) {
  return L.divIcon({
    className: 'custom-stop-icon',
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

function createBusIcon() {
  return L.divIcon({
    className: 'custom-bus-icon',
    html: `<div style="width:24px;height:24px;border-radius:50%;background:#3b82f6;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
      <span style="font-size:12px;">🚌</span>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      if (onMapClick) onMapClick(e.latlng);
    },
  });
  return null;
}

// Fly to a city when selectedCity changes
function MapViewUpdater({ selectedCity }) {
  const map = useMap();
  useEffect(() => {
    const city = ALGERIA_CITIES.find((c) => c.id === selectedCity);
    if (city) {
      map.flyTo([city.lat, city.lng], city.zoom, { duration: 1.2 });
    } else {
      // Algeria overview
      map.flyTo([28.0339, 1.6596], 5, { duration: 1.2 });
    }
  }, [selectedCity, map]);
  return null;
}

export default function BusMap({ onMapClick, searchResults, className = '' }) {
  const { t } = useTranslation();
  const selectedCity = useAppStore((s) => s.selectedCity);
  const selectedRoute = useAppStore((s) => s.selectedRoute);
  const getFilteredRoutes = useAppStore((s) => s.getFilteredRoutes);
  const getRouteStops = useAppStore((s) => s.getRouteStops);
  const busLocations = useAppStore((s) => s.busLocations);
  const buses = useAppStore((s) => s.buses);
  const searchOrigin = useAppStore((s) => s.searchOrigin);
  const searchDestination = useAppStore((s) => s.searchDestination);

  // Initial map center: Algiers
  const initialCenter = [36.7538, 3.0588];
  const initialZoom = 12;

  const allFilteredRoutes = getFilteredRoutes();
  const routesToDisplay = selectedRoute
    ? allFilteredRoutes.filter((r) => r.id === selectedRoute)
    : allFilteredRoutes;

  return (
    <MapContainer center={initialCenter} zoom={initialZoom} className={`w-full h-full ${className}`} zoomControl={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapViewUpdater selectedCity={selectedCity} />
      {onMapClick && <MapClickHandler onMapClick={onMapClick} />}

      {/* Route polylines */}
      {routesToDisplay.map((route) => {
        const stops = getRouteStops(route.id);
        if (stops.length < 2) return null;
        const positions = stops.map((s) => [s.latitude, s.longitude]);
        return (
          <Polyline
            key={route.id}
            positions={positions}
            pathOptions={{
              color: route.color || '#3b82f6',
              weight: selectedRoute === route.id ? 5 : 3,
              opacity: selectedRoute && selectedRoute !== route.id ? 0.3 : 0.8,
            }}
          />
        );
      })}

      {/* Stop markers */}
      {routesToDisplay.map((route) => {
        const stops = getRouteStops(route.id);
        return stops.map((stop) => (
          <Marker key={`${route.id}-${stop.id}`} position={[stop.latitude, stop.longitude]} icon={createStopIcon(route.color || '#3b82f6')}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{stop.name}</p>
                <p className="text-slate-500">{route.name}</p>
              </div>
            </Popup>
          </Marker>
        ));
      })}

      {/* Bus location markers */}
      {Object.entries(busLocations).map(([busId, loc]) => {
        const bus = buses.find((b) => b.id === busId);
        if (!bus) return null;
        if (selectedCity && bus.city !== selectedCity) return null;
        if (selectedRoute && bus.route_id !== selectedRoute) return null;
        return (
          <Marker key={busId} position={[loc.latitude, loc.longitude]} icon={createBusIcon()}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{t('busLabel', { number: bus.bus_number })}</p>
                <p>Near: {loc.nearStop}</p>
                <p className="text-xs text-slate-400">{new Date(loc.timestamp).toLocaleTimeString()}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* Search origin marker */}
      {searchOrigin && (
        <Marker position={[searchOrigin.lat, searchOrigin.lng]}>
          <Popup>{t('yourLocation')}</Popup>
        </Marker>
      )}

      {/* Search destination marker */}
      {searchDestination && (
        <Marker position={[searchDestination.lat, searchDestination.lng]}>
          <Popup>{t('destinationLabel')}</Popup>
        </Marker>
      )}

      {/* Search result route highlight */}
      {searchResults && searchResults.length > 0 && (
        <Polyline
          positions={searchResults[0].stopsOnRoute.map((s) => [s.latitude, s.longitude])}
          pathOptions={{ color: '#10b981', weight: 6, opacity: 0.9, dashArray: '10, 5' }}
        />
      )}
    </MapContainer>
  );
}
