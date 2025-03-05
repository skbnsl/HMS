import axios from "axios"
import axiosIntance from "../Interceptor/AxiosInterceptor.tsx"

const getDoctor = async (id:any) => {
    return axiosIntance.get('/profile/doctor/get/'+id)
            .then((response:any)=>response.data)
            .catch((error:any)=>{throw error});
}

const updateDoctor = async (doctor:any) => {
    return axiosIntance.get('/profile/doctor/update',doctor)
            .then((response:any)=>response.data)
            .catch((error:any)=>{throw error});
}


export  {getDoctor, updateDoctor};