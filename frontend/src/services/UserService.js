import HttpService from './HttpService';

function getById(id) {
  return HttpService.get(`user/${id}`);
}

export default {
  getById,
};
