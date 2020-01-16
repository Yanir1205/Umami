import MealService from '../services/mealService';

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
  console.log(meal);
  debugger
  const action = meal._id ? 'UPDATE' : 'ADD';
  if(action === 'UPDATE'){
    return async dispatch => {
      const newMeal = await MealService.update(meal);
      debugger
      dispatch({ type: action, newMeal });
    };
  } else{
    return async dispatch => {
      const newMeal = await MealService.add(meal);
      debugger
      dispatch({ type: action, newMeal });
    };
  
  }
}

export function remove(id) {
  return async dispatch => {
    await MealService.remove(id);
    dispatch({ type: 'REMOVE', id });
  };
}
