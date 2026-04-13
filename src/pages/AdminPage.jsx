import { useState } from 'react';
import { Settings, Route, MapPin, Bus, MessageSquare, Radio } from 'lucide-react';
import RouteManager from '../components/admin/RouteManager';
import StopManager from '../components/admin/StopManager';
import BusManager from '../components/admin/BusManager';
import CommentModerator from '../components/admin/CommentModerator';
import TrackingPanel from '../components/tracking/TrackingPanel';

const TABS = [
  { id: 'routes', label: 'Routes', icon: Route },
  { id: 'stops', label: 'Stops', icon: MapPin },
  { id: 'buses', label: 'Buses', icon: Bus },
  { id: 'tracking', label: 'Tracking', icon: Radio },
  { id: 'comments', label: 'Comments', icon: MessageSquare },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('routes');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary-500" />
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage routes, stops, buses and reviews</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === id
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'routes' && <RouteManager />}
      {activeTab === 'stops' && <StopManager />}
      {activeTab === 'buses' && <BusManager />}
      {activeTab === 'tracking' && <TrackingPanel />}
      {activeTab === 'comments' && <CommentModerator />}
    </div>
  );
}
