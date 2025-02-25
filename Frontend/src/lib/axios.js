import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE ==="development" ? "http://localhost:8000/api" : "/api",
    withCredentials:true //Enables sending and receiving cookies or other credentials with cross-origin requests.
})