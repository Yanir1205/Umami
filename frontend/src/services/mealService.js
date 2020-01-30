import HttpService from './HttpService';

export default {
  query,
  getById,
  add,
  update,
};

const endpoint = 'meal';

async function query(filter, groupBy, distinctBy) {
  let params;
  if (filter) {
    params = {
      userId: filter.userId,
      at: filter.at,
      type: filter.type,
      tags: filter.tags,
    };
    if (filter.location) {
      params.city = filter.location.city;
      params.country = filter.location.country;
    }
  } else if (groupBy) {
    if (groupBy.meals) {
      params = {
        group: groupBy._id,
        meals: groupBy.meals.$push,
      };
    } else {
      params = {
        group: groupBy._id,
      };
    }
  } else if (distinctBy) {
    params = {
      distinct: distinctBy._id,
    };
  }
  const meals = await HttpService.get(endpoint, filter, params);
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
