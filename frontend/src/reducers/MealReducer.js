import reducerUtility from './reducerUtilities';

let initialValues = {
  meals: [],
};

const MealReducer = reducerUtility.createReducer(initialValues, {
  LOAD: load,
  LOAD_SINGLE: loadSingle,
  ADD: add,
  UPDATE: update,
  REMOVE: remove,
});

function load(state, action) {
  debugger;
  return {
    ...state,
    meals: action.meals,
  };
}

function loadSingle(state, action) {
  return {
    ...state,
    meal: action.meal,
  };
}

function add(state, action) {
  return {
    ...state,
    meals: reducerUtility.addItemToState(state.meals, action.meal),
  };
}

function update(state, action) {
  return {
    ...state,
    meals: reducerUtility.updateItemInArray(state.meals, action.id, toy => {
      return reducerUtility.updateObject(toy, action.meal);
    }),
  };
}

function remove(state, action) {
  return { ...state, meals: reducerUtility.removeItemFromState(state.meals, action.id) };
}

export default MealReducer;
