import api from './index';

const getRoomList = params => {
  return api.get(`/roomList`);
};

export { getRoomList };
