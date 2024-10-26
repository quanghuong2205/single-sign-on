import i18n, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from '@/locales/en/translation.json';
import translationVi from '@/locales/vi/translation.json';
const resources = {
  en: {
    translation: translationEn,
  },
  vi: {
    translation: translationVi,
  },
};

use(initReactI18next).init({
  debug: false,
  fallbackLng: 'en',
  lng: 'en',
  load: 'all',
  ns: ['translation'],
  defaultNS: 'translation',
  resources: resources,
  interpolation: { escapeValue: false },
});

export default i18n;
