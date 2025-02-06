import axios from "axios"
import axiosIntance from "../Interceptor/AxiosInterceptor.tsx"

const registerUser = async (user:any) => {
    return axiosIntance.post('/user/register', user)
            .then((response:any)=>response.data)
            .catch((error:any)=>{throw error});
}


export  {registerUser};