// import React from "react";
// import { JSX } from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// interface ProtectedRouteProps{
//     children:JSX.Element
// }

// const ProtectedRoute:React.FC<ProtectedRouteProps>=({children})=>{
//     const token = useSelector((state:any)=>state.jwt);
//     if(token){
//         return children;
//     }
//     return <Navigate to="/login" />
// }

// export default ProtectedRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode; // Allow multiple children
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = useSelector((state: any) => state.jwt);
    if (token) {
        return <>{children}</>; // Wrap children in a Fragment
    }
    return <Navigate to="/login" />;
};

export default ProtectedRoute;