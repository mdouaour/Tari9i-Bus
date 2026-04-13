import { ChevronRight, MapPin } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';
import CitySelector from '../common/CitySelector';
import { ALGERIA_CITIES } from '../../lib/demoData';

export default function RouteListPanel() {
  const { t, language } = useTranslation();
  const selectedCity = useAppStore((s) => s.selectedCity);
  const selectedRoute = useAppStore((s) => s.selectedRoute);
  const setSelectedRoute = useAppStore((s) => s.setSelectedRoute);
  const getFilteredRoutes = useAppStore((s) => s.getFilteredRoutes);
  const getRouteStops = useAppStore((s) => s.getRouteStops);
  const getAverageRating = useAppStore((s) => s.getAverageRating);

  const routes = getFilteredRoutes();
  const cityInfo = ALGERIA_CITIES.find((c) => c.id === selectedCity);
  const networkLabel = cityInfo
    ? t('cityTransportNetwork', { city: language === 'ar' ? cityInfo.nameAr : cityInfo.name })
    : t('algeriaTransportNetwork');

  return (
    <div className="bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 overflow-y-auto flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 space-y-3">
        <div>
          <h2 className="text-lg font-bold">{t('busRoutes')}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{networkLabel}</p>
        </div>
        <CitySelector />
      </div>

      {selectedRoute && (
        <button
          onClick={() => setSelectedRoute(null)}
          className="w-full px-4 py-2 text-sm text-primary-600 dark:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-left border-b border-slate-200 dark:border-slate-700"
        >
          {t('showAllRoutes')}
        </button>
      )}

      <div className="divide-y divide-slate-100 dark:divide-slate-800 flex-1 overflow-y-auto">
        {routes.length === 0 && (
          <p className="text-sm text-slate-400 dark:text-slate-500 px-4 py-6 text-center">
            {t('noRoutesInCity')}
          </p>
        )}
        {routes.map((route) => {
          const stops = getRouteStops(route.id);
          const avgRating = getAverageRating(route.id);
          const isSelected = selectedRoute === route.id;

          return (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(isSelected ? null : route.id)}
              className={`w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: route.color || '#3b82f6' }}
                >
                  {route.bus_number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{route.name}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" />
                      {t('stopsCount', { count: stops.length })}
                    </span>
                    {avgRating > 0 && (
                      <span className="flex items-center gap-0.5">
                        ★ {avgRating.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>

              {/* Show stops when selected */}
              {isSelected && stops.length > 0 && (
                <div className="mt-3 ml-13 space-y-1.5">
                  {stops.map((stop, idx) => (
                    <div key={stop.id} className="flex items-center gap-2 text-xs">
                      <div className="relative flex flex-col items-center">
                        <div
                          className="w-2.5 h-2.5 rounded-full border-2 border-white"
                          style={{ backgroundColor: route.color }}
                        />
                        {idx < stops.length - 1 && (
                          <div className="w-0.5 h-4 mt-0.5" style={{ backgroundColor: route.color, opacity: 0.4 }} />
                        )}
                      </div>
                      <span className="text-slate-600 dark:text-slate-300">{stop.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
