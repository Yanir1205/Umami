import MealService from '../services/MealService';

export default {
  load,
  getById,
  add,
  remove,
};

export function load() {
  return dispatch => {
    MealService.query().then(meals => {
      dispatch({ type: 'LOAD_MEALS', meals });
    });
  };
}

export function getById(id) {
  console.log("MealActions -> getById =id:",id);
  
  return async dispatch => {
    const meal = await MealService.getById(id);
    console.log("MealActions -> getById = meal: ",meal);

    dispatch({ type: 'GET_BY_ID', meal });
  };
}

export function add(meal) {
  const action = meal._id ? 'UPDATE_MEAL' : 'ADD_MEAL';
  return dispatch => {
    MealService.save(meal).then(meal => {
      dispatch({ type: action, meal });
    });
  };
}

export function remove(id) {
  return dispatch => {
    MealService.remove(id).then(() => {
      dispatch({ type: 'REMOVE_MEAL', id });
    });
  };
}
