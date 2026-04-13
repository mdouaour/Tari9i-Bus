import { MapContainer, TileLayer, Polyline, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useAppStore from '../../store/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';

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

export default function BusMap({ onMapClick, searchResults, className = '' }) {
  const { t } = useTranslation();
  const routes = useAppStore((s) => s.routes);
  const selectedRoute = useAppStore((s) => s.selectedRoute);
  const getRouteStops = useAppStore((s) => s.getRouteStops);
  const busLocations = useAppStore((s) => s.busLocations);
  const buses = useAppStore((s) => s.buses);
  const searchOrigin = useAppStore((s) => s.searchOrigin);
  const searchDestination = useAppStore((s) => s.searchDestination);

  // Algiers center
  const center = [36.7538, 3.0588];

  const routesToDisplay = selectedRoute
    ? routes.filter((r) => r.id === selectedRoute)
    : routes;

  return (
    <MapContainer center={center} zoom={12} className={`w-full h-full ${className}`} zoomControl={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

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
        if (!bus || (selectedRoute && bus.route_id !== selectedRoute)) return null;
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
