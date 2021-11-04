const RE_DIRECT_URI = `${process.env.REACT_APP_DOMAIN}/users/kakao/auth`;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=${RE_DIRECT_URI}`;
