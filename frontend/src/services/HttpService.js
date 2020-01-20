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
  get(endpoint, data) {
    if (data) {
      endpoint += `?userId=${data.userId}&at=${data.at}&type=${data.type}`;
      if (data.location) endpoint += `&city=${data.location.city}&country=${data.location.country}`;
    }
    return ajax(endpoint, 'GET', data);
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data);
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data);
  },
};

async function ajax(endpoint, method = 'get', data = null, dispatch) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
    });
    console.log('data received from get on httpService: ', res.data)
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
