import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? 'https://chatflow-git-main-pankaj-kumars-projects-8ff53621.vercel.app/api'
      : '/api',
  withCredentials: true, //Enables sending and receiving cookies or other credentials with cross-origin requests.
});
