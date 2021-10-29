import api from './index';

const getMainList = () => {
  return api.get('main');
};

export { getMainList };
