import { useEffect, useRef } from 'react';
import useAppStore from '../store/useAppStore';

export function useSimulation() {
  const buses = useAppStore((s) => s.buses);
  const simulateBusLocation = useAppStore((s) => s.simulateBusLocation);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      buses.forEach((bus) => {
        if (bus.status === 'active' && bus.route_id) {
          simulateBusLocation(bus.id, bus.route_id);
        }
      });
    }, 5000);

    // Initial simulation
    buses.forEach((bus) => {
      if (bus.status === 'active' && bus.route_id) {
        simulateBusLocation(bus.id, bus.route_id);
      }
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [buses, simulateBusLocation]);
}
