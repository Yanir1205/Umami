let localLoggedUser = null;
if (sessionStorage.user) localLoggedUser = JSON.parse(sessionStorage.user);

const initialState = {
  loggedInUser: localLoggedUser,
  users: [],
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user };

    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.users],
      };
    default:
      return state;
  }
}
