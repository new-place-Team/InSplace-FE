import api from './index';

// 비동기 통신들

// 회원가입
const addUser = userInfo => api.post('/users/register', userInfo);
// 로그인
const logIn = userInfo => api.post('/users/auth', userInfo);
// 로그인체크
const logInCheck = () => api.post('/users/check/auth');
// 회원 탈퇴
const unRegister = id => api.delete(`/users/${id}`);
// 카카오 로그인 인가코드 서버에 전달
const logInKakao = code => api.get(`/users/kakao/auth?code=${code}`);
// const logInKakao = code => api.post(`/users/kakao/auth`, code);

export { addUser, logIn, logInCheck, unRegister, logInKakao };
