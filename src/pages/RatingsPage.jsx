import { Star } from 'lucide-react';
import RatingsPanel from '../components/ratings/RatingsPanel';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

export default function RatingsPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const routeId = searchParams.get('route') || '';

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          {t('ratingsAndReviews')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{t('shareExperience')}</p>
      </div>
      <RatingsPanel routeId={routeId} />
    </div>
  );
}
