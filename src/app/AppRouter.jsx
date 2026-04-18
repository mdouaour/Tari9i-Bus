import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import MapPage from '../features/map/MapPage';
import SearchPage from '../features/search/SearchPage';
import RoutesPage from '../features/routes/RoutesPage';
import RatingsPage from '../features/ratings/RatingsPage';
import AdminPage from '../features/admin/AdminPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MapPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/ratings" element={<RatingsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
