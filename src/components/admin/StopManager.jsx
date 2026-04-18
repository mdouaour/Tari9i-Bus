import { useState } from 'react';
import { Edit3, MapPin, Plus, Save, Trash2, X } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';

export default function StopManager() {
  const { t } = useTranslation();
  const selectedWilaya = useAppStore((state) => state.selectedWilaya);
  const stops = useAppStore((state) => state.stops.filter((stop) => Number(stop.wilayaId) === Number(selectedWilaya)));
  const addStop = useAppStore((state) => state.addStop);
  const updateStop = useAppStore((state) => state.updateStop);
  const deleteStop = useAppStore((state) => state.deleteStop);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', latitude: '', longitude: '' });

  const resetForm = () => setForm({ name: '', latitude: '', longitude: '' });

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
        <h3 className="font-semibold flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {editing ? t('editStop') : t('addNewStop')}
        </h3>
        <input
          type="text"
          placeholder={t('stopName')}
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            step="any"
            placeholder={t('latitude')}
            value={form.latitude}
            onChange={(event) => setForm((current) => ({ ...current, latitude: event.target.value }))}
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
          />
          <input
            type="number"
            step="any"
            placeholder={t('longitude')}
            value={form.longitude}
            onChange={(event) => setForm((current) => ({ ...current, longitude: event.target.value }))}
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
          />
        </div>

        {editing ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                updateStop(editing, {
                  name: form.name,
                  latitude: Number(form.latitude),
                  longitude: Number(form.longitude),
                });
                setEditing(null);
                resetForm();
              }}
              className="flex-1 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium flex items-center justify-center gap-1"
            >
              <Save className="w-4 h-4" /> {t('save')}
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
              addStop({
                id: `stop-${Date.now()}`,
                name: form.name,
                latitude: Number(form.latitude),
                longitude: Number(form.longitude),
                route_ids: [],
              });
              resetForm();
            }}
            disabled={!form.name || !form.latitude || !form.longitude}
            className="w-full py-2 rounded-lg bg-primary-600 disabled:bg-slate-400 text-white text-sm font-medium flex items-center justify-center gap-1"
          >
            <Plus className="w-4 h-4" /> {t('addStop')}
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800">
        {stops.map((stop) => (
          <div key={stop.id} className="flex items-center gap-3 px-4 py-3">
            <MapPin className="w-4 h-4 text-primary-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{stop.name}</p>
              <p className="text-xs text-slate-500">{stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditing(stop.id);
                setForm({ name: stop.name, latitude: String(stop.latitude), longitude: String(stop.longitude) });
              }}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            </button>
            <button
              type="button"
              onClick={() => deleteStop(stop.id)}
              className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/30"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
