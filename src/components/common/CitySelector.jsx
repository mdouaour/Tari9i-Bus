import { Globe } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';

export default function CitySelector({ className = '' }) {
  const { language } = useTranslation();
  const selectedWilaya = useAppStore((state) => state.selectedWilaya);
  const wilayas = useAppStore((state) => state.wilayas);
  const setWilaya = useAppStore((state) => state.setWilaya);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe className="w-4 h-4 text-primary-500 shrink-0" />
      <select
        value={selectedWilaya}
        onChange={(event) => setWilaya(Number(event.target.value))}
        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
      >
        {wilayas.map((wilaya) => (
          <option key={wilaya.id} value={wilaya.id}>
            {language === 'ar' ? wilaya.nameAr : wilaya.name}
          </option>
        ))}
      </select>
    </div>
  );
}
