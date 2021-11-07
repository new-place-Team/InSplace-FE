import api from './index';

const getMainList = () => api.get('main');

const getSearchCondition = params => {
  return api.get(
    `search/condition?weather=${params.weather}&category=${params.category}&num=${params.num}&gender=${params.gender}`,
  );
};

const getSearchConditionList = params => api.get(`${params}`);
const getPlaceDetail = params => api.get(`posts/${params}`);

const postFavoritesPost = params =>
  api.post(`posts/${params.postId}/favorites`);

const deleteFavoritesPost = params =>
  api.delete(`posts/${params.postId}/favorites`);

const getReview = params => api.get(`/posts/${params}/reviews/write`);

// ㅠㅠ
const addReview = (params, config) => {
  console.log('params >>', params);
  console.log('params >>', params.postId);
  return api.post(`/posts/${params.postId}/reviews`, params.data, config);
};

export {
  getMainList,
  getSearchCondition,
  getPlaceDetail,
  getSearchConditionList,
  postFavoritesPost,
  deleteFavoritesPost,
  getReview,
  addReview,
};
