import MealService from '../services/mealService';

export default {
  load,
  getById,
  add,
  remove,
  loadCities,
  loadCuisines,
  loadUserMeal,
  loadMealsByLocation,
  loadMealsByCuisine,
  loadHomeMeals
};

export function load(filter) {
  return async dispatch => {
    const meals = await MealService.query(filter);
    dispatch({ type: 'LOAD_MEALS', meals });
  };
}

export function loadHomeMeals() {
  return async dispatch => {
    const meals = await MealService.query(null);
    dispatch({ type: 'LOAD_HOME_MEALS', meals });
  };
}

export function loadMealsToList(meals) {
  //this method gets the full list of meals as received from the backend (and stored in the global state)
  //and filters the meals to contain only the meals with releveant occurrences (dates which didn't pass already, occurrences which are not fully occuppied)
  return async dispatch => {
    const filteredMeals = await MealService.filter(meals);
    dispatch({ type: 'LOAD_FILTERED_MEALS', filteredMeals });
  };
}

export function loadUserMeal(filter) {
  return async dispatch => {
    const userMeals = await MealService.query(filter);
    dispatch({ type: 'LOAD_USER_MEAL', userMeals });
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
    dispatch({ type: 'LOAD_MEALS', meals });
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
    dispatch({ type: 'LOAD_MEALS', meals });
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
    dispatch({ type: 'GET_MEAL_BY_ID', meal });
  };
}

export function add(meal) {
  const action = meal._id ? 'UPDATE_MEAL' : 'ADD_MEAL';
  if (action === 'UPDATE_MEAL') {
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
    dispatch({ type: 'REMOVE_MEAL', id });
  };
}

export function getMealForRegistration(meal) {
  //this method does not turn to the backend therefore it is not async!
  return dispatch => {
    const newMeal = MealService.getMealForRegistration(meal);
    dispatch({ type: 'LOAD_MEAL_FOR_REGISTRATION', filteredMeal: newMeal });
  };
}
