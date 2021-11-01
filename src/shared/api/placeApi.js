import api from './index';

const getMainList = () => api.get('main');

const getSearchCondition = params => {
  return api.get(
    `search/condition?weather=${params.weather}&category=${params.category}&num=${params.num}&gender=${params.gender}`,
  );
};

const getPlaceDetail = params => api.get(`/posts/${params}`);

export { getMainList, getSearchCondition, getPlaceDetail };
