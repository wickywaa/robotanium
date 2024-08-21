import axios from 'axios';

const token = `Bearer ${localStorage.getItem('authToken')}`

export const adminBaseAxios = axios.create({
  baseURL: '/api/admin',
  headers: {
      'Authorization': token,
  }
});

adminBaseAxios.interceptors.request.use(function (config:any) {
  config.headers.Authorization = localStorage.getItem('authToken')
  return config;
})