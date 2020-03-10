import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7900'
})

export default api;
