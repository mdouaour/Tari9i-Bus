import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useAppStore from '../../store/useAppStore';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function stopIcon(color) {
  return L.divIcon({
    className: 'custom-stop-icon',
    html: `<div style="width:12px;height:12px;border-radius:9999px;background:${color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35)"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

const busIcon = L.divIcon({
  className: 'custom-bus-icon',
  html: '<div style="width:22px;height:22px;border-radius:9999px;background:#2563eb;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:white;font-size:12px">🚌</div>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(event) {
      if (onMapClick) onMapClick(event.latlng);
    },
  });
  return null;
}

function MapViewportController({ selectedWilaya, wilayas, onBoundsChange }) {
  const map = useMap();

  useEffect(() => {
    const target = wilayas.find((item) => item.id === Number(selectedWilaya));
    if (target) {
      map.flyTo([target.lat, target.lng], target.zoom || 12, { duration: 0.7 });
    }
  }, [map, selectedWilaya, wilayas]);

  useMapEvents({
    moveend() {
      onBoundsChange(map.getBounds());
    },
    zoomend() {
      onBoundsChange(map.getBounds());
    },
  });

  useEffect(() => {
    onBoundsChange(map.getBounds());
  }, [map, onBoundsChange]);

  return null;
}

export default function BusMap({ onMapClick, searchResults, className = '' }) {
  const selectedWilaya = useAppStore((state) => state.selectedWilaya);
  const wilayas = useAppStore((state) => state.wilayas);
  const selectedRoute = useAppStore((state) => state.selectedRoute);
  const selectedStop = useAppStore((state) => state.selectedStop);
  const getFilteredRoutes = useAppStore((state) => state.getFilteredRoutes);
  const getFilteredBuses = useAppStore((state) => state.getFilteredBuses);
  const getRouteStops = useAppStore((state) => state.getRouteStops);
  const busLocations = useAppStore((state) => state.busLocations);
  const searchOrigin = useAppStore((state) => state.searchOrigin);
  const searchDestination = useAppStore((state) => state.searchDestination);
  const searchResult = useAppStore((state) => state.searchResult);

  const [mapBounds, setMapBounds] = useState(null);

  const routes = getFilteredRoutes();
  const buses = getFilteredBuses();

  const routesToDisplay = selectedRoute ? routes.filter((route) => route.id === selectedRoute) : routes;

  const markerStops = useMemo(() => {
    const all = routesToDisplay.flatMap((route) =>
      getRouteStops(route.id).map((stop) => ({
        ...stop,
        routeColor: route.color || '#2563eb',
        routeName: route.name,
      }))
    );

    const unique = new Map();
    for (const stop of all) {
      if (!unique.has(stop.id)) unique.set(stop.id, stop);
    }

    const values = Array.from(unique.values());
    if (!mapBounds) return values;
    return values.filter((stop) => mapBounds.contains([stop.latitude, stop.longitude]));
  }, [getRouteStops, mapBounds, routesToDisplay]);

  const highlightedStops = searchResults?.[0]?.stops || searchResult?.stops || [];
  const focusedStop = selectedStop ? markerStops.find((stop) => stop.id === selectedStop) : null;

  return (
    <MapContainer center={[36.4622, 7.4267]} zoom={13} className={`w-full h-full ${className}`}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapViewportController selectedWilaya={selectedWilaya} wilayas={wilayas} onBoundsChange={setMapBounds} />
      <MapClickHandler onMapClick={onMapClick} />

      {routesToDisplay.map((route) => {
        const points = getRouteStops(route.id).map((stop) => [stop.latitude, stop.longitude]);
        if (points.length < 2) return null;
        return (
          <Polyline
            key={route.id}
            positions={points}
            pathOptions={{
              color: route.color || '#2563eb',
              weight: selectedRoute === route.id ? 5 : 3,
              opacity: selectedRoute && selectedRoute !== route.id ? 0.25 : 0.8,
            }}
          />
        );
      })}

      {markerStops.map((stop) => (
        <Marker key={stop.id} position={[stop.latitude, stop.longitude]} icon={stopIcon(stop.routeColor)}>
          <Popup>
            <strong>{stop.name}</strong>
            <br />
            <small>{stop.routeName}</small>
          </Popup>
        </Marker>
      ))}

      {highlightedStops.length > 1 && (
        <Polyline
          positions={highlightedStops.map((stop) => [stop.latitude, stop.longitude])}
          pathOptions={{ color: '#14b8a6', weight: 6, opacity: 0.85, dashArray: '8 6' }}
        />
      )}

      {searchOrigin && (
        <Marker position={[searchOrigin.lat, searchOrigin.lng]}>
          <Popup>Start</Popup>
        </Marker>
      )}

      {searchDestination && (
        <Marker position={[searchDestination.lat, searchDestination.lng]}>
          <Popup>Destination</Popup>
        </Marker>
      )}

      {focusedStop && (
        <Marker position={[focusedStop.latitude, focusedStop.longitude]}>
          <Popup>{focusedStop.name}</Popup>
        </Marker>
      )}

      {buses.map((bus) => {
        const current = busLocations[bus.id];
        if (!current) return null;
        if (selectedRoute && bus.route_id !== selectedRoute) return null;

        return (
          <Marker key={bus.id} position={[current.latitude, current.longitude]} icon={busIcon}>
            <Popup>
              <strong>{bus.bus_number}</strong>
              <br />
              <small>{current.nearStop || 'en route'}</small>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
