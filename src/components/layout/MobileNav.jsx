import { Link, useLocation } from 'react-router-dom';
import { Map, Search, Bus, Star, Settings } from 'lucide-react';

export default function MobileNav() {
  const location = useLocation();

  const links = [
    { to: '/', icon: Map, label: 'Map' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/routes', icon: Bus, label: 'Routes' },
    { to: '/ratings', icon: Star, label: 'Ratings' },
    { to: '/admin', icon: Settings, label: 'Admin' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 z-[1000]">
      <div className="flex justify-around items-center h-14">
        {links.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs font-medium transition-colors ${
              isActive(to)
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
