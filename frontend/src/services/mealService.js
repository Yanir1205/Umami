import HttpService from './HttpService';

export default {
  query,
  getById,
  add,
  update,
};

const endpoint = 'meal';

function query() {
  return HttpService.get(endpoint);
}

function getById(id) {
  return HttpService.get(`${endpoint}/${id}`);
}

function add(user) {
  return HttpService.push(`${endpoint}/${user._id}`, user);
}

function update(user) {
  return HttpService.put(`${endpoint}/${user._id}`, user);
}
