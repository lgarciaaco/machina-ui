import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const api = axios.create({
  baseURL: process.env.REACT_APP_TRADER_ENDPOINT,
  headers: { Authorization: `Bearer ${process.env.REACT_APP_TRADER_TOKEN}` },
  responseType: 'json'
});

const get = (param) => trackPromise(api.get(param));

const post = (param, body) => trackPromise(api.post(param, body));

const put = (param, body) => trackPromise(api.put(param, body));

const del = (param) => trackPromise(api.delete(param));

export default {
  get,
  post,
  put,
  del,
};
