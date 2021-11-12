/* eslint-disable import/no-cycle */
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
/* 유저별 좋아요 list */
const getFavories = () => api.get('/favorites');
/* 유저별 가본곳 list */
const getVisited = () => api.get('/visitedPosts');
/* 프로필 수정 */
const editProfile = params => api.put(`/users/${params.id}/info`, params.data);
/* 유저 닉네임 중복체크 */
const nicknameCheck = nickname => api.post('/users/check/nickname', nickname);

export {
  addUser,
  logIn,
  logInCheck,
  unRegister,
  logInKakao,
  getFavories,
  getVisited,
  editProfile,
  nicknameCheck,
};
