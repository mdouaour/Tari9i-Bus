import { useState } from 'react';
import { Edit3, GripVertical, Plus, Save, Trash2, X } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';

const ROUTE_COLORS = ['#2563eb', '#dc2626', '#16a34a', '#ea580c'];

export default function RouteManager() {
  const { t } = useTranslation();
  const selectedWilaya = useAppStore((state) => state.selectedWilaya);
  const routes = useAppStore((state) => state.routes.filter((route) => Number(route.wilayaId) === Number(selectedWilaya)));
  const stops = useAppStore((state) => state.stops.filter((stop) => Number(stop.wilayaId) === Number(selectedWilaya)));
  const getRouteStops = useAppStore((state) => state.getRouteStops);
  const addRoute = useAppStore((state) => state.addRoute);
  const updateRoute = useAppStore((state) => state.updateRoute);
  const deleteRoute = useAppStore((state) => state.deleteRoute);
  const addRouteStop = useAppStore((state) => state.addRouteStop);
  const removeRouteStop = useAppStore((state) => state.removeRouteStop);

  const [editing, setEditing] = useState(null);
  const [showAddStop, setShowAddStop] = useState(null);
  const [form, setForm] = useState({ name: '', bus_number: '', color: ROUTE_COLORS[0] });

  const resetForm = () => setForm({ name: '', bus_number: '', color: ROUTE_COLORS[0] });

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
        <h3 className="font-semibold">{editing ? t('editRoute') : t('createNewRoute')}</h3>
        <input
          type="text"
          placeholder={t('routeNamePlaceholder')}
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={t('busNumber')}
            value={form.bus_number}
            onChange={(event) => setForm((current) => ({ ...current, bus_number: event.target.value }))}
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
          />
          <div className="flex gap-1">
            {ROUTE_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setForm((current) => ({ ...current, color }))}
                className="w-8 h-8 rounded-full border-2"
                style={{ backgroundColor: color, borderColor: form.color === color ? 'white' : 'transparent' }}
              />
            ))}
          </div>
        </div>

        {editing ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                updateRoute(editing, form);
                setEditing(null);
                resetForm();
              }}
              className="flex-1 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium flex items-center justify-center gap-1"
            >
              <Save className="w-4 h-4" /> {t('saveChanges')}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                resetForm();
              }}
              className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              addRoute({ id: `route-${Date.now()}`, ...form, status: 'active' });
              resetForm();
            }}
            disabled={!form.name || !form.bus_number}
            className="w-full py-2 rounded-lg bg-primary-600 disabled:bg-slate-400 text-white text-sm font-medium flex items-center justify-center gap-1"
          >
            <Plus className="w-4 h-4" /> {t('createRoute')}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {routes.map((route) => {
          const routeStops = getRouteStops(route.id);
          return (
            <div key={route.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg text-white font-bold grid place-items-center" style={{ backgroundColor: route.color }}>
                  {route.bus_number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{route.name}</p>
                  <p className="text-xs text-slate-500">{routeStops.length} stops</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(route.id);
                    setForm({ name: route.name, bus_number: route.bus_number, color: route.color });
                  }}
                  className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteRoute(route.id)}
                  className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/30"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>

              <div className="space-y-1">
                {routeStops.map((stop, idx) => (
                  <div key={stop.id} className="flex items-center gap-2 px-2 py-1.5 bg-slate-50 dark:bg-slate-800 rounded text-xs">
                    <GripVertical className="w-3 h-3 text-slate-400" />
                    <span className="w-5 h-5 rounded-full text-white text-[10px] font-bold grid place-items-center" style={{ backgroundColor: route.color }}>
                      {idx + 1}
                    </span>
                    <span className="flex-1 truncate">{stop.name}</span>
                    <button type="button" onClick={() => removeRouteStop(route.id, stop.id)}>
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>

              {showAddStop === route.id ? (
                <div className="mt-2 flex gap-2">
                  <select
                    defaultValue=""
                    onChange={(event) => {
                      if (!event.target.value) return;
                      addRouteStop({ route_id: route.id, stop_id: event.target.value, order_index: routeStops.length });
                      setShowAddStop(null);
                    }}
                    className="flex-1 px-2 py-1.5 rounded-lg text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="">{t('selectStop')}</option>
                    {stops.filter((stop) => !routeStops.some((item) => item.id === stop.id)).map((stop) => (
                      <option key={stop.id} value={stop.id}>{stop.name}</option>
                    ))}
                  </select>
                  <button type="button" onClick={() => setShowAddStop(null)} className="px-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddStop(route.id)}
                  className="mt-2 w-full py-1.5 rounded-lg border border-dashed border-primary-300 dark:border-primary-700 text-xs text-primary-700 dark:text-primary-300"
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
