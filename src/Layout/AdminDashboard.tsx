import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar.tsx";
import Header from "../Components/Header/Header.tsx";
import { Outlet, Route, Routes } from "react-router-dom";
import Random from "../Components/Random";

const AdminDashboard = () => {
          return (
                    <div className='flex'>
                    <Sidebar/>
                    <div className='w-full flex flex-col'>
                    <Header/>
                    <Outlet/>
                    </div>
                </div>
          )
}

export default AdminDashboard;