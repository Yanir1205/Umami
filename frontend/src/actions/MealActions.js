import MealService from '../services/mealService';

export default {
  load,
  getById,
  add,
  remove,
};

export function load(filter) {
  console.log('MealAction filter',filter);
  
  return async dispatch => {
    const meals = await MealService.query(filter);
    dispatch({ type: 'LOAD', meals });
  };
}

export function getById(id) {
  return async dispatch => {
    const meal = await MealService.getById(id);
    dispatch({ type: 'GET_BY_ID', meal });
  };
}

export function add(meal) {
  
  const action = meal._id ? 'UPDATE' : 'ADD';
  if (action === 'UPDATE') {
    return async dispatch => {
      const newMeal = await MealService.update(meal);
      console.log('MealAction update meal', newMeal);

      dispatch({ type: action, meal: newMeal });
    };
  } else {
    return async dispatch => {
      console.log('MealAction ADD -> ', meal);
      const newMeal = await MealService.add(meal);
      console.log('MealAction add meal', newMeal);
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
