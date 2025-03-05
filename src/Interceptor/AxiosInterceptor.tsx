import axios, { InternalAxiosRequestConfig } from 'axios';

const axiosIntance = axios.create({
    baseURL:'http://localhost:9000'
})
axiosIntance.interceptors.request.use(
    (config:InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if(token && config.headers){
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("Interceptor:",config);
        return config;
    }
)

export default axiosIntance;