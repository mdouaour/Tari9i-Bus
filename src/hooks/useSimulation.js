import { useEffect, useMemo, useRef } from 'react';
import useAppStore from '../store/useAppStore';

export function useSimulation() {
  const buses = useAppStore((state) => state.getFilteredBuses());
  const routeStops = useAppStore((state) => state.routeStops);
  const stops = useAppStore((state) => state.stops);
  const updateBusLocation = useAppStore((state) => state.updateBusLocation);

  const routeStopMap = useMemo(() => {
    const grouped = new Map();
    for (const item of routeStops) {
      if (!grouped.has(item.route_id)) grouped.set(item.route_id, []);
      grouped.get(item.route_id).push(item);
    }

    for (const [routeId, items] of grouped) {
      items.sort((a, b) => a.order_index - b.order_index);
      grouped.set(
        routeId,
        items
          .map((item) => stops.find((stop) => stop.id === item.stop_id))
          .filter(Boolean)
      );
    }

    return grouped;
  }, [routeStops, stops]);

  const pointers = useRef({});

  useEffect(() => {
    const tick = () => {
      for (const bus of buses) {
        if (bus.status !== 'active' || !bus.route_id) continue;
        const routePath = routeStopMap.get(bus.route_id);
        if (!routePath?.length) continue;

        const currentIndex = pointers.current[bus.id] ?? 0;
        const nextStop = routePath[currentIndex % routePath.length];
        pointers.current[bus.id] = (currentIndex + 1) % routePath.length;

        updateBusLocation(bus.id, {
          latitude: nextStop.latitude,
          longitude: nextStop.longitude,
          nearStop: nextStop.name,
        });
      }
    };

    tick();
    const id = setInterval(tick, 5000);
    return () => clearInterval(id);
  }, [buses, routeStopMap, updateBusLocation]);
}
