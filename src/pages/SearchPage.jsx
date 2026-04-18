import { useState } from 'react';
import BusMap from '../components/map/BusMap';
import SearchPanel from '../components/search/SearchPanel';
import useAppStore from '../store/useAppStore';
import { useTranslation } from '../hooks/useTranslation';

export default function SearchPage() {
  const { t } = useTranslation();
  const setSearchOrigin = useAppStore((state) => state.setSearchOrigin);
  const setSearchDestination = useAppStore((state) => state.setSearchDestination);
  const searchResults = useAppStore((state) => state.searchResults);

  const [mapSelectMode, setMapSelectMode] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(true);

  const handleMapClick = (latlng) => {
    if (mapSelectMode === 'origin') {
      setSearchOrigin({ lat: latlng.lat, lng: latlng.lng, name: `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}` });
      setMapSelectMode(null);
    } else if (mapSelectMode === 'destination') {
      setSearchDestination({ lat: latlng.lat, lng: latlng.lng, name: `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}` });
      setMapSelectMode(null);
    }
  };

  return (
    <div className="h-full relative">
      <BusMap onMapClick={handleMapClick} searchResults={searchResults} className="h-full" />

      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[500] md:hidden">
        <button
          type="button"
          onClick={() => setSheetOpen((current) => !current)}
          className="px-4 py-2 rounded-full bg-white dark:bg-slate-900 shadow text-sm font-medium"
        >
          {sheetOpen ? 'Hide search' : 'Show search'}
        </button>
      </div>

      {mapSelectMode && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[500] rounded-lg bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700 px-3 py-2 text-xs text-primary-700 dark:text-primary-300">
          {mapSelectMode === 'origin' ? t('clickMapToSelectOrigin') : t('clickMapToSelectDest')}
        </div>
      )}

      <div className={`absolute bottom-0 left-0 right-0 z-[500] md:hidden transition-transform duration-300 ${sheetOpen ? 'translate-y-0' : 'translate-y-[85%]'}`}>
        <div className="mx-2 mb-2 rounded-t-2xl rounded-b-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur max-h-[75vh] overflow-y-auto p-3">
          <SearchPanel onSelectOnMap={setMapSelectMode} />
        </div>
      </div>

      <div className="hidden md:block absolute top-4 left-4 z-[500] w-[28rem] max-h-[calc(100%-2rem)] overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur p-4">
        <SearchPanel onSelectOnMap={setMapSelectMode} />
      </div>
    </div>
  );
}
