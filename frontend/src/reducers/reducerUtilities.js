export default {
  createReducer,
  updateObject,
  addItemToState,
  updateItemInState,
  removeItemFromState,
};

export function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}

export function addItemToState(state, item) {
  return [...state, item];
}

export function updateItemInState(state, itemId, updateItemCallback) {
  return state.map(item => (item.id !== itemId ? item : updateItemCallback(item)));
}

export function removeItemFromState(state, itemId) {
  return state.filter(item => item.id !== itemId);
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
