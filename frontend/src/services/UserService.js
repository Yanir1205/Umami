import HttpService from './HttpService';

const authEndpoint = 'auth';
const endpoint = 'user';

async function login(credentails) {
  const user = await HttpService.post(`${authEndpoint}/login`, credentails);
  return _handleLogin(user);
}
async function signup(credentails) {
  const user = await HttpService.post(`${authEndpoint}/signup`, credentails);
  return _handleLogin(user);
}

async function logout() {
  
  await HttpService.post(`${authEndpoint}/logout`);
  sessionStorage.clear();
  
}

function _handleLogin(user) {
  sessionStorage.setItem(endpoint, JSON.stringify(user));
  
  return user;
}

async function getById(id) {
  const user = await HttpService.get(`${endpoint}/${id}`);
  return user;
}
function getUserLoggedIn() {
  return sessionStorage.getItem('user');
}
function checkConnection() {
  const currentUser = getUserLoggedIn();

  if (currentUser) {
    return true;
  } else return false;
}

export default {
  login,
  signup,
  logout,
  getById,
  checkConnection,
  getUserLoggedIn,
};
