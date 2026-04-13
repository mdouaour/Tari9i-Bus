import { Globe } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';
import { ALGERIA_CITIES } from '../../lib/demoData';

/**
 * CitySelector — dropdown to pick an Algerian city (or "all cities").
 * Reads/writes `selectedCity` from the global store.
 */
export default function CitySelector({ className = '' }) {
  const { t, language } = useTranslation();
  const selectedCity = useAppStore((s) => s.selectedCity);
  const setSelectedCity = useAppStore((s) => s.setSelectedCity);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe className="w-4 h-4 text-primary-500 shrink-0" />
      <select
        value={selectedCity || ''}
        onChange={(e) => setSelectedCity(e.target.value || null)}
        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
      >
        <option value="">{t('allCities')}</option>
        {ALGERIA_CITIES.map((city) => (
          <option key={city.id} value={city.id}>
            {language === 'ar' ? city.nameAr : city.name}
          </option>
        ))}
      </select>
    </div>
  );
}
