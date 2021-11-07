import api from './index';

const getMainList = () => api.get('main');

const getSearchCondition = params => {
  return api.get(
    `search/condition?weather=${params.weather}&category=${params.category}&num=${params.num}&gender=${params.gender}`,
  );
};

const getSearchConditionList = params => {
  return api.get(`${params}`);
};

const getPlaceDetail = params => api.get(`/posts/${params}`);

const getReview = params => api.get(`/posts/${params}/reviews/write`);

export {
  getMainList,
  getSearchCondition,
  getPlaceDetail,
  getSearchConditionList,
  getReview,
};
