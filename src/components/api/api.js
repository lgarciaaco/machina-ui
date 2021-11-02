import axios from 'axios';

const BASE_URL = process.env.REACT_APP_TRADER_ENDPOINT;

export function getCandles() {
  return axios.get(` ${BASE_URL}/v1/candles/97514fb4-4ff5-4561-91d1-c8da711d8f32/1h/1/24`)
    .then((response) => response.data);
}

export function getPositions() {
  return axios.get(`${BASE_URL}/v1/positions/1/10`, { headers: { Authorization: `Bearer ${localStorage.getItem('x-access-token')}` } })
    .then((response) => response.data)
    .catch(() => Promise.reject(new Error('Request Not Authenticated!')));
}

export function getOrders() {
  return axios.get(`${BASE_URL}/v1/orders/1/10`, { headers: { Authorization: `Bearer ${localStorage.getItem('x-access-token')}` } })
    .then((response) => response.data)
    .catch(() => Promise.reject(new Error('Request Not Authenticated!')));
}

export function login(data) {
  return axios.get(`${BASE_URL}/v1/users/token`, { auth: { username: data.username, password: data.password } })
    .then((response) => {
      localStorage.setItem('x-access-token', response.data.token);
      localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
      return response.data;
    })
    .catch(() => Promise.reject(new Error('Authentication Failed!')));
}

export function isAuthenticated() {
  return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now();
}
