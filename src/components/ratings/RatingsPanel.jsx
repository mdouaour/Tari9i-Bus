import { useState } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

function StarRating({ rating, onRate, size = 'md' }) {
  const [hover, setHover] = useState(0);
  const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate && onRate(star)}
          onMouseEnter={() => onRate && setHover(star)}
          onMouseLeave={() => onRate && setHover(0)}
          className={onRate ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            className={`${sizeClass} ${
              star <= (hover || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-slate-300 dark:text-slate-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function RatingsPanel({ routeId }) {
  const routes = useAppStore((s) => s.routes);
  const getRouteRatings = useAppStore((s) => s.getRouteRatings);
  const getAverageRating = useAppStore((s) => s.getAverageRating);
  const addRating = useAppStore((s) => s.addRating);

  const [selectedRouteId, setSelectedRouteId] = useState(routeId || '');
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  const activeRouteId = routeId || selectedRouteId;
  const ratings = activeRouteId ? getRouteRatings(activeRouteId) : [];
  const avgRating = activeRouteId ? getAverageRating(activeRouteId) : 0;
  const route = routes.find((r) => r.id === activeRouteId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activeRouteId || newRating === 0) return;

    addRating({
      id: `r-${Date.now()}`,
      user_name: userName || 'Anonymous',
      route_id: activeRouteId,
      rating: newRating,
      comment: newComment,
      created_at: new Date().toISOString(),
    });

    setNewRating(0);
    setNewComment('');
    setUserName('');
  };

  return (
    <div className="space-y-4">
      {/* Route selector */}
      {!routeId && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <label className="text-sm font-medium mb-2 block">Select Route</label>
          <select
            value={selectedRouteId}
            onChange={(e) => setSelectedRouteId(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Choose a bus route...</option>
            {routes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.bus_number} - {r.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {activeRouteId && route && (
        <>
          {/* Summary */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: route.color }}
              >
                {route.bus_number}
              </div>
              <div>
                <h3 className="font-bold">{route.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <StarRating rating={Math.round(avgRating)} size="sm" />
                  <span>{avgRating.toFixed(1)} ({ratings.length} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add review form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Leave a Review
            </h4>

            <div className="mb-3">
              <label className="text-xs font-medium text-slate-500 mb-1 block">Your Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Anonymous"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="mb-3">
              <label className="text-xs font-medium text-slate-500 mb-1 block">Rating</label>
              <StarRating rating={newRating} onRate={setNewRating} />
            </div>

            <div className="mb-3">
              <label className="text-xs font-medium text-slate-500 mb-1 block">Comment</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your experience... (delay, comfort, driver behavior)"
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={newRating === 0}
              className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Review
            </button>
          </form>

          {/* Reviews list */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <h4 className="font-semibold mb-3">Reviews ({ratings.length})</h4>
            {ratings.length === 0 ? (
              <p className="text-sm text-slate-500">No reviews yet. Be the first!</p>
            ) : (
              <div className="space-y-3">
                {ratings.map((review) => (
                  <div key={review.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{review.user_name}</span>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    {review.comment && (
                      <p className="text-sm text-slate-600 dark:text-slate-300">{review.comment}</p>
                    )}
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
