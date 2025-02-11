// utils/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// تكوين نظام تعدد اللغات
const resources = {
  ar: {
    translation: {
      welcome: 'مرحباً بك في مساعد النطق',
      start_recording: 'ابدأ التسجيل',
      stop_recording: 'إيقاف التسجيل',
      settings: 'الإعدادات',
      help: 'المساعدة',
      // ... المزيد من الترجمات
    }
  },
  en: {
    translation: {
      welcome: 'Welcome to Speech Assistant',
      start_recording: 'Start Recording',
      stop_recording: 'Stop Recording',
      settings: 'Settings',
      help: 'Help',
      // ... المزيد من الترجمات
    }
  },
  fr: {
    translation: {
      welcome: 'Bienvenue sur Speech Assistant',
      start_recording: 'Commencer l\'enregistrement',
      stop_recording: 'Arrêter l\'enregistrement',
      settings: 'Paramètres',
      help: 'Aide',
      // ... المزيد من الترجمات
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

// components/LanguageSelector.tsx
export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="border rounded-md p-2"
    >
      <option value="ar">العربية</option>
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  );
};
