import useAppStore from '../store/useAppStore';
import { getTranslation, languages } from '../lib/i18n';

export function useTranslation() {
  const language = useAppStore((s) => s.language);

  const t = (key, params) => getTranslation(language, key, params);
  const dir = languages[language]?.dir || 'ltr';
  const isRTL = dir === 'rtl';

  return { t, dir, isRTL, language };
}
