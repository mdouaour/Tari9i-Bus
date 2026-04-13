import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { defaultLanguage, languages } from './lib/i18n';

// Initialize dark mode
document.documentElement.classList.add('dark');

// Initialize language direction
const langConfig = languages[defaultLanguage];
document.documentElement.setAttribute('dir', langConfig.dir);
document.documentElement.setAttribute('lang', defaultLanguage);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
