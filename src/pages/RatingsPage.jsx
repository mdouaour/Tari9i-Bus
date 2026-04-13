import { Star } from 'lucide-react';
import RatingsPanel from '../components/ratings/RatingsPanel';
import { useSearchParams } from 'react-router-dom';

export default function RatingsPage() {
  const [searchParams] = useSearchParams();
  const routeId = searchParams.get('route') || '';

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          Ratings & Reviews
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Share your experience with bus routes</p>
      </div>
      <RatingsPanel routeId={routeId} />
    </div>
  );
}
