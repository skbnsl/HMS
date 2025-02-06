import axios, { InternalAxiosRequestConfig } from 'axios';

const axiosIntance = axios.create({
    baseURL:'http://localhost:9000'
})
axiosIntance.interceptors.request.use(
    (config:InternalAxiosRequestConfig) => {
        console.log("Interceptor:",config);
        return config;
    }
)

export default axiosIntance;