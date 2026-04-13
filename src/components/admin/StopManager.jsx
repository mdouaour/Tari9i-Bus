import { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, MapPin } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';
import { ALGERIA_CITIES } from '../../lib/demoData';

export default function StopManager() {
  const { t, language } = useTranslation();
  const stops = useAppStore((s) => s.stops);
  const selectedCity = useAppStore((s) => s.selectedCity);
  const addStop = useAppStore((s) => s.addStop);
  const updateStop = useAppStore((s) => s.updateStop);
  const deleteStop = useAppStore((s) => s.deleteStop);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', latitude: '', longitude: '', city: selectedCity || 'alger' });

  const visibleStops = selectedCity ? stops.filter((s) => s.city === selectedCity) : stops;

  const handleCreate = () => {
    const id = `stop-${Date.now()}`;
    addStop({ ...form, id, latitude: parseFloat(form.latitude), longitude: parseFloat(form.longitude), route_ids: [] });
    setForm({ name: '', latitude: '', longitude: '', city: selectedCity || 'alger' });
  };

  const handleUpdate = (id) => {
    updateStop(id, { ...form, latitude: parseFloat(form.latitude), longitude: parseFloat(form.longitude) });
    setEditing(null);
    setForm({ name: '', latitude: '', longitude: '', city: selectedCity || 'alger' });
  };

  const startEdit = (stop) => {
    setEditing(stop.id);
    setForm({ name: stop.name, latitude: String(stop.latitude), longitude: String(stop.longitude), city: stop.city || 'alger' });
  };

  return (
    <div className="space-y-4">
      {/* Create/Edit form */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {editing ? t('editStop') : t('addNewStop')}
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
            placeholder={t('stopName')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="flex gap-3">
            <input
              type="number"
              step="any"
              placeholder={t('latitude')}
              value={form.latitude}
              onChange={(e) => setForm({ ...form, latitude: e.target.value })}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="number"
              step="any"
              placeholder={t('longitude')}
              value={form.longitude}
              onChange={(e) => setForm({ ...form, longitude: e.target.value })}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <p className="text-xs text-slate-500">{t('stopTip')}</p>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button onClick={() => handleUpdate(editing)} className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                  <Save className="w-4 h-4" /> {t('save')}
                </button>
                <button onClick={() => { setEditing(null); setForm({ name: '', latitude: '', longitude: '', city: selectedCity || 'alger' }); }} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm">
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button onClick={handleCreate} disabled={!form.name || !form.latitude || !form.longitude} className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                <Plus className="w-4 h-4" /> {t('addStop')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stops list */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800">
        {visibleStops.length === 0 && (
          <p className="text-sm text-slate-400 px-4 py-6 text-center">{t('noRoutesInCity')}</p>
        )}
        {visibleStops.map((stop) => {
          const cityInfo = ALGERIA_CITIES.find((c) => c.id === stop.city);
          const cityLabel = cityInfo ? (language === 'ar' ? cityInfo.nameAr : cityInfo.name) : stop.city;
          return (
            <div key={stop.id} className="flex items-center gap-3 px-4 py-3">
              <MapPin className="w-4 h-4 text-primary-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{stop.name}</p>
                <p className="text-xs text-slate-500">{cityLabel} · {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}</p>
              </div>
              <button onClick={() => startEdit(stop)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button onClick={() => deleteStop(stop.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                <Trash2 className="w-3.5 h-3.5 text-red-500" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
