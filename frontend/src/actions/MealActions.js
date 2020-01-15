import MealService from '../services/MealService';

export default {
  load,
  loadSingle,
  add,
  remove,
};

export function load() {
  return async dispatch => {
    const meals = await MealService.query();
    dispatch({ type: 'LOAD', meals });
  };
}

export function loadSingle(id) {
  return async dispatch => {
    const meal = await MealService.getById(id);
    dispatch({ type: 'LOAD_SINGLE', meal });
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
