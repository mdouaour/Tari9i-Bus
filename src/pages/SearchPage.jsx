import { useState } from 'react';
import BusMap from '../components/map/BusMap';
import SearchPanel from '../components/search/SearchPanel';
import useAppStore from '../store/useAppStore';
import { useTranslation } from '../hooks/useTranslation';

export default function SearchPage() {
  const { t } = useTranslation();
  const setSearchOrigin = useAppStore((s) => s.setSearchOrigin);
  const setSearchDestination = useAppStore((s) => s.setSearchDestination);
  const searchResults = useAppStore((s) => s.searchResults);
  const [mapSelectMode, setMapSelectMode] = useState(null);

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
    <div className="flex flex-col md:flex-row h-full">
      <div className="md:w-96 shrink-0 overflow-y-auto p-4 space-y-4">
        <SearchPanel onSelectOnMap={setMapSelectMode} />

        {mapSelectMode && (
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-3 text-sm text-primary-700 dark:text-primary-300">
            {mapSelectMode === 'origin' ? t('clickMapToSelectOrigin') : t('clickMapToSelectDest')}
          </div>
        )}
      </div>
      <div className="flex-1 min-h-[300px]">
        <BusMap onMapClick={handleMapClick} searchResults={searchResults} />
      </div>
    </div>
  );
}
