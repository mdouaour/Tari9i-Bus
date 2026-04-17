import { useState } from 'react';
import { MapPin, Navigation, Clock, Footprints, ArrowRight, X } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';
import CitySelector from '../common/CitySelector';

export default function SearchPanel({ onSelectOnMap }) {
  const { t } = useTranslation();
  const getFilteredStops = useAppStore((s) => s.getFilteredStops);
  const findRoutes = useAppStore((s) => s.findRoutes);
  const searchResults = useAppStore((s) => s.searchResults);
  const searchOrigin = useAppStore((s) => s.searchOrigin);
  const searchDestination = useAppStore((s) => s.searchDestination);
  const clearSearch = useAppStore((s) => s.clearSearch);
  const setSearchOrigin = useAppStore((s) => s.setSearchOrigin);
  const setSearchDestination = useAppStore((s) => s.setSearchDestination);

  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  const stops = getFilteredStops();

  const filteredOriginStops = originQuery.length > 0
    ? stops.filter((s) => s.name.toLowerCase().includes(originQuery.toLowerCase()))
    : [];

  const filteredDestStops = destQuery.length > 0
    ? stops.filter((s) => s.name.toLowerCase().includes(destQuery.toLowerCase()))
    : [];

  const handleSelectOriginStop = (stop) => {
    setSearchOrigin({ lat: stop.latitude, lng: stop.longitude, name: stop.name });
    setOriginQuery(stop.name);
    setShowOriginSuggestions(false);
  };

  const handleSelectDestStop = (stop) => {
    setSearchDestination({ lat: stop.latitude, lng: stop.longitude, name: stop.name });
    setDestQuery(stop.name);
    setShowDestSuggestions(false);
  };

  const handleSearch = () => {
    if (searchOrigin && searchDestination) {
      findRoutes(searchOrigin, searchDestination);
    }
  };

  const handleClear = () => {
    clearSearch();
    setOriginQuery('');
    setDestQuery('');
  };

  const handleMapSelect = (type) => {
    if (onSelectOnMap) onSelectOnMap(type);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-primary-500" />
          {t('findYourRoute')}
        </h2>

        {/* City selector */}
        <div className="mb-3">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t('city')}</label>
          <CitySelector />
        </div>

        {/* Origin input */}
        <div className="relative mb-3">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t('from')}</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
              <input
                type="text"
                value={originQuery}
                onChange={(e) => {
                  setOriginQuery(e.target.value);
                  setShowOriginSuggestions(true);
                }}
                onFocus={() => setShowOriginSuggestions(true)}
                placeholder={t('startLocation')}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {showOriginSuggestions && filteredOriginStops.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
                  {filteredOriginStops.map((stop) => (
                    <button
                      key={stop.id}
                      onClick={() => handleSelectOriginStop(stop)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      {stop.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => handleMapSelect('origin')}
              className="px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 whitespace-nowrap"
            >
              {t('selectOnMap')}
            </button>
          </div>
        </div>

        {/* Destination input */}
        <div className="relative mb-4">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t('to')}</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
              <input
                type="text"
                value={destQuery}
                onChange={(e) => {
                  setDestQuery(e.target.value);
                  setShowDestSuggestions(true);
                }}
                onFocus={() => setShowDestSuggestions(true)}
                placeholder={t('destination')}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {showDestSuggestions && filteredDestStops.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
                  {filteredDestStops.map((stop) => (
                    <button
                      key={stop.id}
                      onClick={() => handleSelectDestStop(stop)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      {stop.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => handleMapSelect('destination')}
              className="px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 whitespace-nowrap"
            >
              {t('selectOnMap')}
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            disabled={!searchOrigin || !searchDestination}
            className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            {t('searchRoutes')}
          </button>
          {(searchOrigin || searchDestination || searchResults) && (
            <button
              onClick={handleClear}
              className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {searchResults && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <h3 className="font-semibold mb-3">
            {searchResults.length > 0
              ? t('routesFound', { count: searchResults.length })
              : t('noRoutesFound')}
          </h3>

          {searchResults.length === 0 && (
            <p className="text-sm text-slate-500">{t('tryDifferentLocations')}</p>
          )}

          <div className="space-y-3">
            {searchResults.map((result, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${
                  idx === 0
                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                {idx === 0 && (
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 mb-1 block">
                    {t('bestRoute')}
                  </span>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: result.route.color }}
                  >
                    {result.route.bus_number}
                  </div>
                  <span className="font-medium text-sm">{result.route.name}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400 mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {t('estimatedTime', { time: result.estimatedTime })}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {t('stopsCount', { count: result.numStops })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Footprints className="w-3 h-3" />
                    {t('kmWalk', { distance: (result.walkToStop + result.walkFromStop).toFixed(1) })}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs flex-wrap">
                  <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                    {t('walk', { distance: result.walkToStop.toFixed(1) })}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">
                    🚌 {result.boardStop.name}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">
                    {result.alightStop.name}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
                    {t('walk', { distance: result.walkFromStop.toFixed(1) })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
