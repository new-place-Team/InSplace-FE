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

export { addUser, logIn, logInCheck, unRegister };
