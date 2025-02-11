import {createSlice} from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const userSlice = createSlice({
    name:'user',
    initialState:localStorage.getItem('token')?jwtDecode(localStorage.getItem('token')||''):{},
    reducers: {
        removeuser:(state) => {
            localStorage.removeItem('token');
            state = '';
            return state;
        }
    }
})

export const { removeuser} = userSlice.actions;
export default userSlice.reducer;