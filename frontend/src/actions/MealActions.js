import MealService from '../services/MealService';

export default {
  load,
  getById,
  add,
  remove,
};

export function load() {
  return async dispatch => {
    const meals = await MealService.query();
    dispatch({ type: 'LOAD', meals });
  };
}

export function getById(id) {
  console.log('MealActions -> getById =id:', id);

  return async dispatch => {
    const meal = await MealService.getById(id);
    console.log('MealActions -> getById = meal: ', meal);

    dispatch({ type: 'GET_BY_ID', meal });
  };
}

export function add(meal) {
  const action = meal._id ? 'UPDATE' : 'ADD';
  return async dispatch => {
    const newMeal = await MealService.save(meal);
    dispatch({ type: action, newMeal });
  };
}

export function remove(id) {
  return async dispatch => {
    await MealService.remove(id);
    dispatch({ type: 'REMOVE', id });
  };
}
