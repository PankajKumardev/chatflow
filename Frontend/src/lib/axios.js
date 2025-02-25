import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://chatflow-nine.vercel.app/api',
  withCredentials: true,
});
