import api from './index';

const getMainList = () => {
  return api.get('main');
};

const getSearchCondition = params => {
  console.log('params', params);
  return api.get(
    `search/condition?weather=${params.weather}&category=${params.category}&num=${params.num}&gender=${params.gender}`,
  );
};

export { getMainList, getSearchCondition };
