import { configureStore } from "@reduxjs/toolkit";
import jwtReducer from "../Slices/JwtSlice.tsx";

export default configureStore({
    reducer:{
        jwt : jwtReducer
    }
})