import HttpService from './HttpService';

export default {
  query,
  getById,
  add,
  update,
  getMealForRegistration
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

function getMealForRegistration(meal) {
  //this method gets a regular meal object
  //returns a new meal containing only the following occurrences:
  //dates that didn't already pass
  //occurrences which have more room left

  const newMeal = { ...meal }
  const now = Date.now()
  const newOccurrences = []
  newMeal.occurrences.forEach(occurrence => {
    if (occurrence.total < newMeal.capacity && occurrence.date > now) {
      newOccurrences.push(occurrence)
    }
  })
  newMeal.occurrences = newOccurrences
  return newMeal;
}