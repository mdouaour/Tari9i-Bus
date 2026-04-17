import { Bus, MapPin } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import CitySelector from '../components/common/CitySelector';
import { ALGERIA_CITIES } from '../lib/demoData';

export default function RoutesPage() {
  const { t, language } = useTranslation();
  const selectedCity = useAppStore((s) => s.selectedCity);
  const getFilteredRoutes = useAppStore((s) => s.getFilteredRoutes);
  const getRouteStops = useAppStore((s) => s.getRouteStops);
  const getAverageRating = useAppStore((s) => s.getAverageRating);

  const routes = getFilteredRoutes();
  const cityInfo = ALGERIA_CITIES.find((c) => c.id === selectedCity);
  const subtitle = cityInfo
    ? t('routesInCity', { city: language === 'ar' ? cityInfo.nameAr : cityInfo.name })
    : t('routesInAllCities');

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bus className="w-6 h-6 text-primary-500" />
            {t('busRoutes')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
        <CitySelector className="sm:w-56" />
      </div>

      {routes.length === 0 && (
        <div className="text-center py-12 text-slate-400 dark:text-slate-500">
          <Bus className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p>{t('noRoutesInCity')}</p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {routes.map((route) => {
          const stops = getRouteStops(route.id);
          const avgRating = getAverageRating(route.id);
          const firstStop = stops[0];
          const lastStop = stops[stops.length - 1];

          return (
            <div key={route.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: route.color }}
                >
                  {route.bus_number}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{route.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span><MapPin className="w-3 h-3 inline" /> {t('stopsCount', { count: stops.length })}</span>
                    {avgRating > 0 && <span>★ {avgRating.toFixed(1)}</span>}
                  </div>
                </div>
              </div>

              {firstStop && lastStop && (
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-3">
                  <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded">
                    {firstStop.name}
                  </span>
                  <span>→</span>
                  <span className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded">
                    {lastStop.name}
                  </span>
                </div>
              )}

              <div className="flex gap-2">
                <Link
                  to={`/ratings?route=${route.id}`}
                  className="flex-1 text-center py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {t('reviews')}
                </Link>
                <Link
                  to="/"
                  className="flex-1 text-center py-1.5 text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
                >
                  {t('viewOnMap')}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
