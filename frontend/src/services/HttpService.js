import history from '../history';
import Axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/';
// const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '//localhost:3030/';

var axios = Axios.create({
  withCredentials: true,
});

export default {
  get(endpoint, data, params) {
    return ajax(endpoint, 'GET', data, params);
  },
  post(endpoint, data, params) {
    return ajax(endpoint, 'POST', data, params);
  },
  put(endpoint, data, params) {
    return ajax(endpoint, 'PUT', data, params);
  },
  delete(endpoint, data, params) {
    return ajax(endpoint, 'DELETE', data, params);
  },
};

async function ajax(endpoint, method = 'get', data = null, params = null, dispatch) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params,
    });
    return res.data;
  } catch (err) {
    console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}, with params: ${params}`);
    console.dir(err);
    if (err.response && err.response.status === 401) {
      history.push('/');
      // diaspatch ('authorization error')
    }
    // diaspatch ('error')
    throw err;
  }
}
