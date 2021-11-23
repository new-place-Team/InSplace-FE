/* eslint-disable react/button-has-type */
import React from 'react';
import { useTranslation } from 'react-i18next';
// import { changeLanguage } from 'i18next';

const Test = () => {
  const { t, i18n } = useTranslation();
  const korean = () => {
    i18n.changeLanguage('ko-KR');
  };
  const american = () => {
    i18n.changeLanguage('en-US');
  };

  return (
    <>
      <h1>language : {i18n.language}</h1>
      <h2>{t('test')}</h2>
      <button
        style={{ backgroundColor: '#0066ff', color: '#fff' }}
        onClick={korean}
      >
        한국어
      </button>
      <button
        style={{ backgroundColor: '#ff4949', color: '#fff' }}
        onClick={american}
      >
        English
      </button>
    </>
  );
};

export default Test;
