/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
import { history } from '../redux/configureStore';
/* 개발모드에서 logger */
export const logger = msg => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log(msg);
};

/* localStorage에서 토큰 가져오기 */
export const getToken = () => {
  return new Promise(resolve => {
    const token = localStorage.getItem('USER_TOKEN');
    if (token) {
      resolve(`Bearer ${token}`);
    } else {
      resolve(null);
    }
  });
};

/* localStorage에서 language 가져오기 */
export const getLanguage = () => {
  return new Promise(resolve => {
    const lang = localStorage.getItem('i18nextLng');
    const langArr = lang.split('-');
    let language = langArr[0];
    if (language !== 'ko') {
      language = 'en';
    }
    if (language) {
      resolve(language);
    } else {
      resolve(null);
    }
  });
};

/* localStorage 토큰유무 확인 */
export const getTokenYn = () => {
  // eslint-disable-next-line no-undef
  return !!localStorage.getItem('USER_TOKEN');
};

/* 현재위치 위도경도 가져오기 */
export const getPosition = options => {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const isLoginChk = isLogin => {
  if (!isLogin) {
    const confirm = window.confirm(
      '로그인을 해야 이용할 수 있는 서비스입니다 로그인 하시겠습니까?',
    );
    if (confirm) {
      history.push('/login');
    }
    return false;
  }
  return true;
};
