import history from '../history';
import Axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : '//localhost:3030/api/'
// const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '//localhost:3030/';

var axios = Axios.create({
  withCredentials: true,
});

export default {
  get(endpoint, data, pararms) {
    return ajax(endpoint, 'GET', data, pararms);
  },
  post(endpoint, data, pararms) {
    return ajax(endpoint, 'POST', data, pararms);
  },
  put(endpoint, data, pararms) {

    return ajax(endpoint, 'PUT', data, pararms);
  },
  delete(endpoint, data, pararms) {
    return ajax(endpoint, 'DELETE', data, pararms);
  },
};

async function ajax(endpoint, method = 'get', data = null, dispatch, params = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params
    });
    console.log('HttpServer - > res.data',res.data);

    return res.data;
  } catch (err) {
    console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`);
    console.dir(err);
    if (err.response && err.response.status === 401) {
      history.push('/'); // diaspatch ('authorization error')
    }
    // diaspatch ('error')
    throw err;
  }
}
