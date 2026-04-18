import { useEffect } from 'react';
import AppRouter from './app/AppRouter';
import useAppStore from './store/useAppStore';

export default function App() {
  const initializeApp = useAppStore((state) => state.initializeApp);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return <AppRouter />;
}
