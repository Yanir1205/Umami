import HttpService from './HttpService';

export default {
  query,
  getById,
  add,
  update,
};

const endpoint = 'meal';

async function query(filter) {
  let params;
  if (filter) {
    params = {
      userId: filter.userId,
      at: filter.at,
      type: filter.type,
    };
    if (filter.location) {
      params.city = filter.location.city;
      params.country = filter.location.country;
    }
  }
  const meals = await HttpService.get(endpoint, filter, params);
  return meals;
}

/*
if (data) {
      endpoint += `?userId=${data.userId}&at=${data.at}&type=${data.type}`;
      if (data.location) endpoint += `&city=${data.location.city}&country=${data.location.country}`;
    }
*/

async function getById(id) {
  const meal = await HttpService.get(`${endpoint}/${id}`);
  return meal;
}

async function add(meal) {
  debugger;
  const addedMeal = await HttpService.post(`${endpoint}`, meal);
  return addedMeal;
}

async function update(meal) {
  console.log('@@@@@@MealService -> update  ');
  const updatedMeal = await HttpService.put(`${endpoint}/${meal._id}`, meal);
  
  return updatedMeal;
}
