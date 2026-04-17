import { Outlet } from 'react-router-dom';
import Header from './Header';
import MobileNav from './MobileNav';
import { useTranslation } from '../../hooks/useTranslation';

export default function Layout() {
  const { dir } = useTranslation();
  return (
    <div dir={dir} className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header />
      <main className="flex-1 overflow-auto pb-16 md:pb-0">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
}
