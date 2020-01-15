import MealService from '../services/mealService';

export default {
  load,
  loadSingle,
  add,
  remove,
};

export function load() {
  return dispatch => {
    MealService.query().then(meals => {
      dispatch({ type: 'LOAD', meals });
      debugger
    });
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
  return dispatch => {
    MealService.save(meal).then(meal => {
      dispatch({ type: action, meal });
    });
  };
}

export function remove(id) {
  return dispatch => {
    MealService.remove(id).then(() => {
      dispatch({ type: 'REMOVE', id });
    });
  };
}
