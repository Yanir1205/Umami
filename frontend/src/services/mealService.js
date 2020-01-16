import HttpService from './HttpService';

export default {
  query,
  getById,
  add,
  update,
};

const endpoint = 'meal';

async function query() {
  const meals = await HttpService.get(endpoint);
  return meals;
}

async function getById(id) {
  const meal = await HttpService.get(`${endpoint}/${id}`);
  return meal;
}

async function add(meal) {
  const addedMeal = await HttpService.post(`${endpoint}`, meal);
  return addedMeal;
}

async function update(meal) {
  const updatedMeal = await HttpService.put(`${endpoint}/${meal._id}`, meal);
  return updatedMeal;
}
