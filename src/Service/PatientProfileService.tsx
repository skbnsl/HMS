import axios from "axios"
import axiosIntance from "../Interceptor/AxiosInterceptor.tsx"

const getPatient = async (id:any) => {
    return axiosIntance.get('/profile/patient/get/'+id)
            .then((response:any)=>response.data)
            .catch((error:any)=>{throw error});
}

const updatePatient = async (patient:any) => {
    return axiosIntance.get('/profile/patient/update',patient)
            .then((response:any)=>response.data)
            .catch((error:any)=>{throw error});
}


export  {getPatient, updatePatient};