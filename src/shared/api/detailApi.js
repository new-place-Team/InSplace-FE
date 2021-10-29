import api from './index';

const getDetail = params => {
  return api.get(`/posts/${params}`);
};

export { getDetail };
