import HttpService from './HttpService';

export default {
  query,
  getById,
  add,
  update,
};

const endpoint = 'meal';

/**
 * Hi arkashkah haseksi
 */

function query() {
  return HttpService.get(endpoint);
}

function getById(id) {
  return HttpService.get(`${endpoint}/${id}`);
}

function add(meal) {
  return HttpService.push(`${endpoint}/${meal._id}`, meal);
}

function update(meal) {
  return HttpService.put(`${endpoint}/${meal._id}`, meal);
}
