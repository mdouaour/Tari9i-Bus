import { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, Bus } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

export default function BusManager() {
  const buses = useAppStore((s) => s.buses);
  const routes = useAppStore((s) => s.routes);
  const addBus = useAppStore((s) => s.addBus);
  const updateBus = useAppStore((s) => s.updateBus);
  const deleteBus = useAppStore((s) => s.deleteBus);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ bus_number: '', status: 'active', route_id: '' });

  const handleCreate = () => {
    const id = `bus-${Date.now()}`;
    addBus({ ...form, id });
    setForm({ bus_number: '', status: 'active', route_id: '' });
  };

  const handleUpdate = (id) => {
    updateBus(id, form);
    setEditing(null);
    setForm({ bus_number: '', status: 'active', route_id: '' });
  };

  const startEdit = (bus) => {
    setEditing(bus.id);
    setForm({ bus_number: bus.bus_number, status: bus.status, route_id: bus.route_id || '' });
  };

  return (
    <div className="space-y-4">
      {/* Create/Edit form */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Bus className="w-4 h-4" />
          {editing ? 'Edit Bus' : 'Add New Bus'}
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Bus number (e.g., B-006)"
            value={form.bus_number}
            onChange={(e) => setForm({ ...form, bus_number: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="flex gap-3">
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm"
            >
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={form.route_id}
              onChange={(e) => setForm({ ...form, route_id: e.target.value })}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm"
            >
              <option value="">No route assigned</option>
              {routes.map((r) => (
                <option key={r.id} value={r.id}>{r.bus_number} - {r.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button onClick={() => handleUpdate(editing)} className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                  <Save className="w-4 h-4" /> Save
                </button>
                <button onClick={() => { setEditing(null); setForm({ bus_number: '', status: 'active', route_id: '' }); }} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm">
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button onClick={handleCreate} disabled={!form.bus_number} className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                <Plus className="w-4 h-4" /> Add Bus
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Buses list */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800">
        {buses.map((bus) => {
          const route = routes.find((r) => r.id === bus.route_id);
          return (
            <div key={bus.id} className="flex items-center gap-3 px-4 py-3">
              <Bus className="w-4 h-4 text-primary-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{bus.bus_number}</p>
                <p className="text-xs text-slate-500">
                  {route ? route.name : 'No route'} ·{' '}
                  <span className={bus.status === 'active' ? 'text-green-500' : bus.status === 'maintenance' ? 'text-yellow-500' : 'text-red-500'}>
                    {bus.status}
                  </span>
                </p>
              </div>
              <button onClick={() => startEdit(bus)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button onClick={() => deleteBus(bus.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                <Trash2 className="w-3.5 h-3.5 text-red-500" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
