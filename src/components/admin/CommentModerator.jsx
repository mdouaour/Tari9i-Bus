import { Trash2, Star } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';

export default function CommentModerator() {
  const { t } = useTranslation();
  const ratings = useAppStore((s) => s.ratings);
  const suggestions = useAppStore((s) => s.suggestions);
  const routes = useAppStore((s) => s.routes);
  const deleteRating = useAppStore((s) => s.deleteRating);

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-semibold mb-1">{t('commentModeration')}</h3>
        <p className="text-sm text-slate-500 mb-3">{t('totalReviews', { count: ratings.length })}</p>

        {ratings.length === 0 ? (
          <p className="text-sm text-slate-500">{t('noReviewsToModerate')}</p>
        ) : (
          <div className="space-y-2">
            {ratings.map((review) => {
              const route = routes.find((r) => r.id === review.route_id);
              return (
                <div key={review.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{review.user_name}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                        ))}
                      </div>
                    </div>
                    {route && (
                      <p className="text-xs text-slate-500 mb-1">{t('routeLabel', { name: route.name })}</p>
                    )}
                    {review.comment && (
                      <p className="text-sm text-slate-600 dark:text-slate-300">{review.comment}</p>
                    )}
                    <p className="text-xs text-slate-400 mt-1">{new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => deleteRating(review.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded shrink-0" title={t('deleteReview')}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-semibold mb-2">{t('userSuggestions', { count: suggestions.length })}</h3>
        {suggestions.length === 0 ? (
          <p className="text-sm text-slate-500">{t('noPendingSuggestions')}</p>
        ) : (
          <div className="space-y-2">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <p className="text-sm">{suggestion.note}</p>
                <p className="text-xs text-slate-500 mt-1">{new Date(suggestion.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
