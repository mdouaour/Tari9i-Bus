import { Radio, MapPin, Clock } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useSimulation } from '../../hooks/useSimulation';
import { useTranslation } from '../../hooks/useTranslation';

export default function TrackingPanel() {
  useSimulation();
  const { t } = useTranslation();

  const buses = useAppStore((s) => s.buses);
  const routes = useAppStore((s) => s.routes);
  const busLocations = useAppStore((s) => s.busLocations);

  const activeBuses = buses.filter((b) => b.status === 'active');

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-semibold mb-1 flex items-center gap-2">
          <Radio className="w-4 h-4 text-green-500 animate-pulse" />
          {t('liveBusTracking')}
        </h3>
        <p className="text-sm text-slate-500 mb-3">
          {t('simulatedTrackingDesc')}
        </p>

        {activeBuses.length === 0 ? (
          <p className="text-sm text-slate-500">{t('noActiveBuses')}</p>
        ) : (
          <div className="space-y-2">
            {activeBuses.map((bus) => {
              const route = routes.find((r) => r.id === bus.route_id);
              const location = busLocations[bus.id];

              return (
                <div key={bus.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center text-white text-lg">
                      🚌
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{bus.bus_number}</p>
                      {route && <p className="text-xs text-slate-500">{route.name}</p>}
                    </div>
                    <div className={`w-2 h-2 rounded-full ${location ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                  </div>

                  {location && (
                    <div className="mt-2 pl-13 grid grid-cols-2 gap-2 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {t('nearStop', { name: location.nearStop })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(location.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300 font-medium mb-1">{t('trackingModeSimulated')}</p>
        <p className="text-xs text-amber-600 dark:text-amber-400">
          {t('trackingExplanation')}
        </p>
      </div>
    </div>
  );
}
