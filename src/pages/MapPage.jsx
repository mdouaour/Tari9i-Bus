import { useState } from 'react';
import BusMap from '../components/map/BusMap';
import RouteListPanel from '../components/map/RouteListPanel';
import { useSimulation } from '../hooks/useSimulation';
import { useTranslation } from '../hooks/useTranslation';

export default function MapPage() {
  const { t } = useTranslation();
  useSimulation();
  const [showPanel, setShowPanel] = useState(true);

  return (
    <div className="flex h-full relative">
      {/* Route list panel - collapsible on mobile */}
      <div className={`${showPanel ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden shrink-0 hidden md:block`}>
        <RouteListPanel />
      </div>

      {/* Mobile panel toggle */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="md:hidden absolute top-3 left-3 z-[500] bg-white dark:bg-slate-800 shadow-lg px-3 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700"
      >
        {showPanel ? t('close') : t('routesButton')}
      </button>

      {/* Mobile panel overlay */}
      {showPanel && (
        <div className="md:hidden absolute inset-0 z-[400] bg-white dark:bg-slate-900 overflow-y-auto">
          <div className="pt-14">
            <RouteListPanel />
          </div>
        </div>
      )}

      {/* Map */}
      <div className="flex-1 relative">
        <BusMap />
      </div>
    </div>
  );
}
