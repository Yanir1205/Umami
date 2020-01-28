import MealService from '../services/mealService';

export default {
  load,
  getById,
  add,
  remove,
  loadCities,
  loadCuisines,
  loadMealsByLocation,
  loadMealsByCuisine,
};

export function load(filter) {
  return async dispatch => {
    const meals = await MealService.query(filter);
    dispatch({ type: 'LOAD', meals });
  };
}

export function loadCities() {
  const groupBy = {
    _id: '$location.city',
  };
  return async dispatch => {
    const cities = await MealService.query(null, groupBy);
    const citiesToReducer = cities.map(city => city._id);
    dispatch({ type: 'LOAD_CITIES', citiesToReducer });
  };
}

export function loadMealsByLocation() {
  const groupBy = {
    _id: '$location.city',
    meals: {
      $push: '$$ROOT',
    },
  };
  return async dispatch => {
    const meals = await MealService.query(null, groupBy);
    dispatch({ type: 'LOAD', meals });
  };
}

export function loadMealsByCuisine() {
  const groupBy = {
    _id: '$cuisineType',
    meals: {
      $push: '$$ROOT',
    },
  };
  return async dispatch => {
    const meals = await MealService.query(null, groupBy);
    dispatch({ type: 'LOAD', meals });
  };
}

export function loadCuisines() {
  const groupBy = {
    _id: '$cuisineType',
  };
  return async dispatch => {
    const cuisineTypes = await MealService.query(null, groupBy);
    const cuisineTypesToReducer = cuisineTypes.map(cuisine => cuisine._id);
    dispatch({ type: 'LOAD_CUISINES', cuisineTypesToReducer });
  };
}

export function loadTags() {
  const distinct = {
    _id: 'tags',
  };
  return async dispatch => {
    const tags = await MealService.query(null, null, distinct);
    // const cuisineTypesToReducer = cuisineTypes.map(cuisine => cuisine._id)
    dispatch({ type: 'LOAD_TAGS', tags });
  };
}

export function getById(id) {
  return async dispatch => {
    const meal = await MealService.getById(id);
    dispatch({ type: 'GET_BY_ID', meal });
  };
}

export function add(meal) {
  debugger;
  const action = meal._id ? 'UPDATE' : 'ADD';
  if (action === 'UPDATE') {
    return async dispatch => {
      const newMeal = await MealService.update(meal);
      dispatch({ type: action, meal: newMeal });
    };
  } else {
    return async dispatch => {
      const newMeal = await MealService.add(meal);
      dispatch({ type: action, meal: newMeal });
    };
  }
}

export function remove(id) {
  return async dispatch => {
    await MealService.remove(id);
    dispatch({ type: 'REMOVE', id });
  };
}
