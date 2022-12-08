import axios from 'axios'

var api = axios.create({
  baseURL: 'http://localhost:8001/api/',
  /* other custom settings */
});

export default api;