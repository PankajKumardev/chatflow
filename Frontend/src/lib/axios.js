import axios from 'axios';

const mode = import.meta.env.MODE || 'production';

export const axiosInstance = axios.create({
  baseURL:
    mode === 'development' ? 'https://chatflow-nine.vercel.app/api' : '/api',
  withCredentials: true,
});
