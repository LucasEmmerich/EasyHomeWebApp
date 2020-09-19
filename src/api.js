import axios from 'axios';
const config = require('../package.json').config;

const api = axios.create({
    baseURL : config.dsvApiAddress
});

export default api;
