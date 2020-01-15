import HttpService from './HttpService';

async function login(credentails) {
  const user = await HttpService.post('auth/login', credentails);
  return _handleLogin(user);
}
async function signup(credentails) {
  const user = await HttpService.post('auth/signup', credentails);
  return _handleLogin(user);
}
async function logout() {
  await HttpService.post('auth/logout');
  sessionStorage.clear();
}
function _handleLogin(user) {
  sessionStorage.setItem('user', JSON.stringify(user));
  return user;
}

export default {
  login,
  signup,
  logout,
};
