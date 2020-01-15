import UserService from '../services/UserService';
import { loading, doneLoading } from './SystemActions';
// import history from './../history';

export function login(credentails) {
  return async dispatch => {
    const user = await UserService.login(credentails);
    dispatch(_setUser(user));
  };
}
export function signup(credentails) {
  return async dispatch => {
    const user = await UserService.signup(credentails);
    dispatch(_addUser(user));
  };
}
export function logout() {
  return async dispatch => {
    await UserService.logout();
    dispatch(_setUser(null));
  };
}

export function getById() {
  return async dispatch => {
    try {
      dispatch(loading());
      const user = await UserService.getById();
      dispatch(_setUser(user));
    } catch (err) {
      console.log('UserActions: err in getById', err);
      // example for rerouting - after changing the store
      // history.push('/some/path');
    } finally {
      dispatch(doneLoading());
    }
  };
}

function _setUser(user) {
  return {
    type: 'SET_USER',
    user,
  };
}

function _addUser(user) {
  return {
    type: 'ADD_USER',
    user,
  };
}

export default {
  login,
  logout,
  signup,
  getById,
};
