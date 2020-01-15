import reducerUtility from './reducerUtilities';

let localLoggedUser = null;
if (sessionStorage.user) localLoggedUser = JSON.parse(sessionStorage.user);

const initialState = {
  loggedInUser: localLoggedUser,
};

const UserReducer = reducerUtility.createReducer(initialState, {
  SET_USER: load,
  ADD_USER: add,
});

function load(state, action) {
  return { ...state, loggedInUser: action.user };
}

function add(state, action) {
  return {
    ...state,
    loggedInUser: reducerUtility.addItemToState(state.user, action.payload),
  };
}

export default UserReducer;
