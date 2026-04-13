import { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, GripVertical } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';
import { ALGERIA_CITIES } from '../../lib/demoData';

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function RouteManager() {
  const { t, language } = useTranslation();
  const routes = useAppStore((s) => s.routes);
  const selectedCity = useAppStore((s) => s.selectedCity);
  const stops = useAppStore((s) => s.stops);
  const getRouteStops = useAppStore((s) => s.getRouteStops);
  const addRoute = useAppStore((s) => s.addRoute);
  const updateRoute = useAppStore((s) => s.updateRoute);
  const deleteRoute = useAppStore((s) => s.deleteRoute);
  const addRouteStop = useAppStore((s) => s.addRouteStop);
  const removeRouteStop = useAppStore((s) => s.removeRouteStop);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', bus_number: '', color: '#3b82f6', city: selectedCity || 'alger' });
  const [showAddStop, setShowAddStop] = useState(null);

  // Show routes for selected city (or all)
  const visibleRoutes = selectedCity ? routes.filter((r) => r.city === selectedCity) : routes;
  // Stops available for the route's city
  const stopsForCity = (cityId) => stops.filter((s) => s.city === cityId);

  const handleCreate = () => {
    const id = `route-${Date.now()}`;
    addRoute({ ...form, id, status: 'active' });
    setForm({ name: '', bus_number: '', color: '#3b82f6', city: selectedCity || 'alger' });
  };

  const handleUpdate = (id) => {
    updateRoute(id, form);
    setEditing(null);
    setForm({ name: '', bus_number: '', color: '#3b82f6', city: selectedCity || 'alger' });
  };

  const startEdit = (route) => {
    setEditing(route.id);
    setForm({ name: route.name, bus_number: route.bus_number, color: route.color || '#3b82f6', city: route.city || 'alger' });
  };

  const handleAddStopToRoute = (routeId, stopId) => {
    const routeStops = getRouteStops(routeId);
    addRouteStop({ route_id: routeId, stop_id: stopId, order_index: routeStops.length });
    setShowAddStop(null);
  };

  return (
    <div className="space-y-4">
      {/* Create/Edit form */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {editing ? t('editRoute') : t('createNewRoute')}
        </h3>
        <div className="space-y-3">
          {/* City */}
          <select
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {ALGERIA_CITIES.map((c) => (
              <option key={c.id} value={c.id}>{language === 'ar' ? c.nameAr : c.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder={t('routeNamePlaceholder')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder={t('busNumber')}
              value={form.bus_number}
              onChange={(e) => setForm({ ...form, bus_number: e.target.value })}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex gap-1">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setForm({ ...form, color: c })}
                  className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                  style={{ backgroundColor: c, borderColor: form.color === c ? 'white' : 'transparent' }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button
                  onClick={() => handleUpdate(editing)}
                  disabled={!form.name || !form.bus_number}
                  className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                >
                  <Save className="w-4 h-4" /> {t('saveChanges')}
                </button>
                <button
                  onClick={() => { setEditing(null); setForm({ name: '', bus_number: '', color: '#3b82f6', city: selectedCity || 'alger' }); }}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={handleCreate}
                disabled={!form.name || !form.bus_number}
                className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> {t('createRoute')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Route list */}
      <div className="space-y-3">
        {visibleRoutes.map((route) => {
          const routeStops = getRouteStops(route.id);
          const cityInfo = ALGERIA_CITIES.find((c) => c.id === route.city);
          const cityLabel = cityInfo ? (language === 'ar' ? cityInfo.nameAr : cityInfo.name) : route.city;
          return (
            <div key={route.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: route.color }}
                >
                  {route.bus_number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{route.name}</p>
                  <p className="text-xs text-slate-400">{cityLabel} · {t('stopsCount', { count: routeStops.length })}</p>
                </div>
                <button onClick={() => startEdit(route)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button onClick={() => deleteRoute(route.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>

              {/* Stops */}
              <div className="space-y-1">
                {routeStops.map((stop, idx) => (
                  <div key={stop.id} className="flex items-center gap-2 text-xs bg-slate-50 dark:bg-slate-800 rounded px-2 py-1.5">
                    <GripVertical className="w-3 h-3 text-slate-400 shrink-0" />
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                      style={{ backgroundColor: route.color }}
                    >
                      {idx + 1}
                    </div>
                    <span className="flex-1 truncate">{stop.name}</span>
                    <button
                      onClick={() => removeRouteStop(route.id, stop.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add stop */}
              {showAddStop === route.id ? (
                <div className="mt-2 flex gap-2">
                  <select
                    className="flex-1 px-2 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800"
                    onChange={(e) => e.target.value && handleAddStopToRoute(route.id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="">{t('selectStop')}</option>
                    {stopsForCity(route.city)
                      .filter((s) => !routeStops.find((rs) => rs.id === s.id))
                      .map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                  </select>
                  <button onClick={() => setShowAddStop(null)} className="px-2 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddStop(route.id)}
                  className="mt-2 w-full py-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 border border-dashed border-primary-300 dark:border-primary-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10"
                >
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
