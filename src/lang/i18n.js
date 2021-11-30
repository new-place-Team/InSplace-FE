import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import langEn from './lang.en.json';
import langKo from './lang.ko.json';

const resource = {
  'en-US': {
    translation: langEn,
  },
  'ko-KR': {
    translation: langKo,
  },
};

const getThisLang = () => {
  let lang = 'ko-KR';
  if (window.navigator.language !== 'ko') lang = 'en-US';
  console.log('lang', lang);
  return lang;
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: resource,
    // 초기 설정 언어
    lng: getThisLang(),
    fallbackLng: {
      'en-US': ['en-US'],
      default: ['ko-KR'],
    },
    debug: true,
    defaultNS: 'translation',
    ns: 'translation',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

const init = lang => {
  i18n.use(initReactI18next).init({
    resources: resource,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: true,
      prefix: '{',
      suffix: '}',
    },
    lng: lang,
  });
};

export default init;
