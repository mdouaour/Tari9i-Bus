import en from './en';
import fr from './fr';
import ar from './ar';

export const languages = {
  en: { name: 'English', nativeName: 'English', dir: 'ltr', translations: en },
  fr: { name: 'French', nativeName: 'Français', dir: 'ltr', translations: fr },
  ar: { name: 'Arabic', nativeName: 'العربية', dir: 'rtl', translations: ar },
};

export const defaultLanguage = 'fr';

export function getTranslation(lang, key, params = {}) {
  const translations = languages[lang]?.translations || languages[defaultLanguage].translations;
  let text = translations[key] || languages[defaultLanguage].translations[key] || key;

  // Replace {param} placeholders
  Object.entries(params).forEach(([paramKey, value]) => {
    text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), value);
  });

  return text;
}
