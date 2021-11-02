import api from './index';

const addUser = userInfo => api.post('/users/register', userInfo);

const logIn = userInfo => api.post('/users/auth', userInfo);

const logInCheck = () => api.post('/users/check/auth');

export { addUser, logIn, logInCheck };
