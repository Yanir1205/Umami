import reducerUtility from './reducerUtilities';

let initialValues = {
  meals: [],
};

const MealReducer = reducerUtility.createReducer(initialValues, {
  LOAD: load,
  GET_BY_ID: getById,
  ADD: add,
  UPDATE: update,
  REMOVE: remove,
});

function load(state, action) {
  return {
    ...state,
    meals: action.meals,
  };
}

function getById(state, action) {
  return {
    ...state,
    [action.meals.name]: action.meals,
  };
}

function add(state, action) {
  return {
    ...state,
    meals: reducerUtility.addItemToState(state.meals, action.meals),
  };
}

function update(state, action) {
  return {
    ...state,
    meals: reducerUtility.updateItemInArray(state.meals, action.id, toy => {
      return reducerUtility.updateObject(toy, action.meals);
    }),
  };
}

function remove(state, action) {
  return { ...state, meals: reducerUtility.removeItemFromState(state.meals, action.id) };
}

export default MealReducer;
