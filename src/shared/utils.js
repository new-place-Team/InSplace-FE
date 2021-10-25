/* 개발모드에서 logger */
export const logger = msg => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log(msg);
};

/* localStorage에서 토큰 가져오기 */
export const getToken = () => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token');
  if (token) {
    return `Bearer ${token}`;
  }
  return null;
};
