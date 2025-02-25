import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE ==="development" ? "https://chatflow-nine.vercel.app/api" : "https://chatflow-nine.vercel.app/api",
    withCredentials:true //Enables sending and receiving cookies or other credentials with cross-origin requests.
})