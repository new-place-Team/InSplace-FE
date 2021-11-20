import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { currentLang } from '../shared/utils';
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

const initLang = currentLang();
console.log(initLang);

i18n.use(initReactI18next).init({
  resources: resource,
  // 초기 설정 언어
  lng: 'en-US',
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
    fallbackLng: 'en-US',
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
