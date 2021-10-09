import axios from 'axios';

const BASE_URL = process.env.REACT_APP_TRADER_ENDPOINT;

export function getStrategies() {
    return axios.get(`${BASE_URL}/v1/candles/ethusdt/4h/10`)
        .then(response => response.data);
}

export function getPositions() {
    return axios.get(`${BASE_URL}/v1/positions`, {headers: {Authorization: `Bearer ${localStorage.getItem('x-access-token')}`}})
        .then(response => response.data)
        .catch(err => Promise.reject('Request Not Authenticated!'));
}

export function login(data) {
    return axios.get(`${BASE_URL}/v1/users/token`, {auth: {username: data.name, password: data.password}})
        .then(response => {
            localStorage.setItem('x-access-token', response.data.token);
            localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
            return response.data
        })
        .catch(err => Promise.reject('Authentication Failed!'));
}

export function isAuthenticated() {
    return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()
}