import { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, GripVertical } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function RouteManager() {
  const { t } = useTranslation();
  const routes = useAppStore((s) => s.routes);
  const stops = useAppStore((s) => s.stops);
  const getRouteStops = useAppStore((s) => s.getRouteStops);
  const addRoute = useAppStore((s) => s.addRoute);
  const updateRoute = useAppStore((s) => s.updateRoute);
  const deleteRoute = useAppStore((s) => s.deleteRoute);
  const addRouteStop = useAppStore((s) => s.addRouteStop);
  const removeRouteStop = useAppStore((s) => s.removeRouteStop);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', bus_number: '', color: '#3b82f6' });
  const [showAddStop, setShowAddStop] = useState(null);

  const handleCreate = () => {
    const id = `route-${Date.now()}`;
    addRoute({ ...form, id, status: 'active' });
    setForm({ name: '', bus_number: '', color: '#3b82f6' });
  };

  const handleUpdate = (id) => {
    updateRoute(id, form);
    setEditing(null);
    setForm({ name: '', bus_number: '', color: '#3b82f6' });
  };

  const startEdit = (route) => {
    setEditing(route.id);
    setForm({ name: route.name, bus_number: route.bus_number, color: route.color || '#3b82f6' });
  };

  const handleAddStopToRoute = (routeId, stopId) => {
    const routeStops = getRouteStops(routeId);
    addRouteStop({ route_id: routeId, stop_id: stopId, order_index: routeStops.length });
    setShowAddStop(null);
  };

  return (
    <div className="space-y-4">
      {/* Create new route */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {editing ? t('editRoute') : t('createNewRoute')}
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder={t('routeNamePlaceholder')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="flex gap-3">
            <input
              type="text"
              placeholder={t('busNumber')}
              value={form.bus_number}
              onChange={(e) => setForm({ ...form, bus_number: e.target.value })}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex gap-1 items-center">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setForm({ ...form, color: c })}
                  className={`w-7 h-7 rounded-full border-2 ${form.color === c ? 'border-white ring-2 ring-primary-500' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button onClick={() => handleUpdate(editing)} className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                  <Save className="w-4 h-4" /> {t('saveChanges')}
                </button>
                <button onClick={() => { setEditing(null); setForm({ name: '', bus_number: '', color: '#3b82f6' }); }} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm">
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button onClick={handleCreate} disabled={!form.name || !form.bus_number} className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                <Plus className="w-4 h-4" /> {t('createRoute')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Routes list */}
      <div className="space-y-3">
        {routes.map((route) => {
          const routeStops = getRouteStops(route.id);
          return (
            <div key={route.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: route.color }}>
                  {route.bus_number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{route.name}</p>
                  <p className="text-xs text-slate-500">{t('stopsCount', { count: routeStops.length })}</p>
                </div>
                <button onClick={() => startEdit(route)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  <Edit3 className="w-4 h-4 text-slate-500" />
                </button>
                <button onClick={() => deleteRoute(route.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Stops list */}
              <div className="space-y-1 mb-2">
                {routeStops.map((stop, idx) => (
                  <div key={stop.id} className="flex items-center gap-2 text-sm py-1 px-2 rounded bg-slate-50 dark:bg-slate-800">
                    <GripVertical className="w-3 h-3 text-slate-400" />
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: route.color, color: 'white' }}>
                      {idx + 1}
                    </div>
                    <span className="flex-1 text-sm">{stop.name}</span>
                    <button onClick={() => removeRouteStop(route.id, stop.id)} className="text-red-400 hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add stop button */}
              {showAddStop === route.id ? (
                <div className="flex gap-2 mt-2">
                  <select
                    onChange={(e) => { if (e.target.value) handleAddStopToRoute(route.id, e.target.value); }}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm"
                    defaultValue=""
                  >
                    <option value="">{t('selectStop')}</option>
                    {stops.filter((s) => !routeStops.find((rs) => rs.id === s.id)).map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  <button onClick={() => setShowAddStop(null)} className="px-2 text-slate-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowAddStop(route.id)} className="text-xs text-primary-600 dark:text-primary-400 hover:underline mt-1">
                  {t('addStopToRoute')}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
