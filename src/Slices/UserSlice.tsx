import {createSlice} from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const userSlice = createSlice({
    name:'user',
    initialState:localStorage.getItem('token')?jwtDecode(localStorage.getItem('token')||''):{},
    reducers: {
        setUser: (state,action) => {
            //localStorage.setItem('token',action.payload);
            state = action.payload;
            return state;
        },
        removeuser:(state) => {
            //localStorage.removeItem('token');
            state = {};
            return state;
        }
    }
})

export const { setUser,removeuser} = userSlice.actions;
export default userSlice.reducer;