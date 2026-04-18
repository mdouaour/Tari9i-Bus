import { useMemo, useState } from 'react';
import { ArrowRight, MapPin, Navigation, Send, X } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import CitySelector from '../common/CitySelector';
import { useTranslation } from '../../hooks/useTranslation';

function StopAutocomplete({ value, onChange, placeholder, options, onPick }) {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
      />
      {value.length > 1 && options.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 z-30 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 max-h-44 overflow-y-auto">
          {options.slice(0, 8).map((stop) => (
            <button
              type="button"
              key={stop.id}
              onClick={() => onPick(stop)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {stop.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPanel({ onSelectOnMap }) {
  const { t } = useTranslation();
  const getFilteredStops = useAppStore((state) => state.getFilteredStops);
  const setSearchOrigin = useAppStore((state) => state.setSearchOrigin);
  const setSearchDestination = useAppStore((state) => state.setSearchDestination);
  const findRoutes = useAppStore((state) => state.findRoutes);
  const clearSearch = useAppStore((state) => state.clearSearch);
  const addSuggestion = useAppStore((state) => state.addSuggestion);
  const searchOrigin = useAppStore((state) => state.searchOrigin);
  const searchDestination = useAppStore((state) => state.searchDestination);
  const searchResult = useAppStore((state) => state.searchResult);

  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [suggestionText, setSuggestionText] = useState('');

  const stops = getFilteredStops();

  const originMatches = useMemo(
    () => stops.filter((stop) => stop.name.toLowerCase().includes(fromQuery.toLowerCase())),
    [fromQuery, stops]
  );

  const destinationMatches = useMemo(
    () => stops.filter((stop) => stop.name.toLowerCase().includes(toQuery.toLowerCase())),
    [stops, toQuery]
  );

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Navigation className="w-5 h-5 text-primary-500" />
          {t('findYourRoute')}
        </h2>

        <CitySelector />

        <div>
          <label className="text-xs text-slate-500">{t('from')}</label>
          <div className="mt-1 flex gap-2">
            <StopAutocomplete
              value={fromQuery}
              onChange={setFromQuery}
              placeholder={t('startLocation')}
              options={originMatches}
              onPick={(stop) => {
                setSearchOrigin({ lat: stop.latitude, lng: stop.longitude, name: stop.name });
                setFromQuery(stop.name);
              }}
            />
            <button
              type="button"
              onClick={() => onSelectOnMap?.('origin')}
              className="px-3 text-xs rounded-lg bg-slate-100 dark:bg-slate-800"
            >
              {t('selectOnMap')}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-500">{t('to')}</label>
          <div className="mt-1 flex gap-2">
            <StopAutocomplete
              value={toQuery}
              onChange={setToQuery}
              placeholder={t('destination')}
              options={destinationMatches}
              onPick={(stop) => {
                setSearchDestination({ lat: stop.latitude, lng: stop.longitude, name: stop.name });
                setToQuery(stop.name);
              }}
            />
            <button
              type="button"
              onClick={() => onSelectOnMap?.('destination')}
              className="px-3 text-xs rounded-lg bg-slate-100 dark:bg-slate-800"
            >
              {t('selectOnMap')}
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (searchOrigin && searchDestination) findRoutes(searchOrigin, searchDestination);
            }}
            className="flex-1 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium disabled:bg-slate-400"
            disabled={!searchOrigin || !searchDestination}
          >
            {t('searchRoutes')}
          </button>
          <button
            type="button"
            onClick={() => {
              clearSearch();
              setFromQuery('');
              setToQuery('');
            }}
            className="px-3 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-2">
        <h3 className="font-semibold">{t('suggestionsTitle')}</h3>
        <textarea
          value={suggestionText}
          onChange={(event) => setSuggestionText(event.target.value)}
          placeholder={t('suggestionPlaceholder')}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm resize-none"
        />
        <button
          type="button"
          onClick={() => {
            if (!suggestionText.trim()) return;
            addSuggestion({ type: 'user-edit', note: suggestionText.trim() });
            setSuggestionText('');
          }}
          className="w-full py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-sm font-medium flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" /> {t('submitSuggestion')}
        </button>
      </div>

      {searchResult && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-slate-600 dark:text-slate-300" aria-label="Route summary">
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-800">
              <dt className="text-xs text-slate-500">{t('estimatedTimeLabel')}</dt>
              <dd className="font-semibold">{searchResult.estimatedTime} min</dd>
            </div>
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-800">
              <dt className="text-xs text-slate-500">{t('walkToStartLabel')}</dt>
              <dd className="font-semibold">{searchResult.walkToStartKm.toFixed(2)} km</dd>
            </div>
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-800">
              <dt className="text-xs text-slate-500">{t('walkFromEndLabel')}</dt>
              <dd className="font-semibold">{searchResult.walkFromEndKm.toFixed(2)} km</dd>
            </div>
          </dl>

          <div className="space-y-2">
            {searchResult.steps.map((step) => (
              <div key={step} className="text-sm p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                {step}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1 text-xs">
            {searchResult.stops.map((stop, idx) => (
              <span key={stop.id} className="inline-flex items-center">
                <span className="px-2 py-1 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">{stop.name}</span>
                {idx < searchResult.stops.length - 1 && <ArrowRight className="w-3 h-3 mx-1 text-slate-400" />}
              </span>
            ))}
          </div>
        </div>
      )}

      {!searchResult && (
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-sm text-slate-500 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {t('searchHint')}
        </div>
      )}
    </div>
  );
}
