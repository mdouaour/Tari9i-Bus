import { useState } from 'react';
import { Bus, Edit3, Plus, Save, Trash2, X } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';

export default function BusManager() {
  const { t } = useTranslation();
  const selectedWilaya = useAppStore((state) => state.selectedWilaya);
  const buses = useAppStore((state) => state.buses.filter((bus) => Number(bus.wilayaId) === Number(selectedWilaya)));
  const routes = useAppStore((state) => state.routes.filter((route) => Number(route.wilayaId) === Number(selectedWilaya)));
  const addBus = useAppStore((state) => state.addBus);
  const updateBus = useAppStore((state) => state.updateBus);
  const deleteBus = useAppStore((state) => state.deleteBus);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ bus_number: '', status: 'active', route_id: '' });

  const resetForm = () => setForm({ bus_number: '', status: 'active', route_id: '' });

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
        <h3 className="font-semibold flex items-center gap-2"><Bus className="w-4 h-4" />{editing ? t('editBus') : t('addNewBus')}</h3>
        <input
          type="text"
          placeholder={t('busNumberPlaceholder')}
          value={form.bus_number}
          onChange={(event) => setForm((current) => ({ ...current, bus_number: event.target.value }))}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            value={form.status}
            onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
          >
            <option value="active">{t('statusActive')}</option>
            <option value="maintenance">{t('statusMaintenance')}</option>
            <option value="inactive">{t('statusInactive')}</option>
          </select>
          <select
            value={form.route_id}
            onChange={(event) => setForm((current) => ({ ...current, route_id: event.target.value }))}
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
          >
            <option value="">{t('noRouteAssigned')}</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>{route.bus_number} - {route.name}</option>
            ))}
          </select>
        </div>

        {editing ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                updateBus(editing, form);
                setEditing(null);
                resetForm();
              }}
              className="flex-1 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium flex items-center justify-center gap-1"
            >
              <Save className="w-4 h-4" /> {t('save')}
            </button>
            <button type="button" onClick={() => { setEditing(null); resetForm(); }} className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              addBus({ id: `bus-${Date.now()}`, ...form });
              resetForm();
            }}
            disabled={!form.bus_number}
            className="w-full py-2 rounded-lg bg-primary-600 disabled:bg-slate-400 text-white text-sm font-medium flex items-center justify-center gap-1"
          >
            <Plus className="w-4 h-4" /> {t('addBus')}
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800">
        {buses.map((bus) => {
          const route = routes.find((item) => item.id === bus.route_id);
          return (
            <div key={bus.id} className="flex items-center gap-3 px-4 py-3">
              <Bus className="w-4 h-4 text-primary-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{bus.bus_number}</p>
                <p className="text-xs text-slate-500">{route ? route.name : t('noRoute')} · {bus.status}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditing(bus.id);
                  setForm({ bus_number: bus.bus_number, status: bus.status, route_id: bus.route_id || '' });
                }}
                className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button type="button" onClick={() => deleteBus(bus.id)} className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/30">
                <Trash2 className="w-3.5 h-3.5 text-red-500" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
