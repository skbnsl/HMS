import React from 'react';
import Sidebar from '../Components/Sidebar/Sidebar.tsx';
import Header from '../Components/Header/Header.tsx';

const AppRoutes = () => {
    return (
        <div className='flex'>
            <Sidebar/>
            <div className='w-full'>
            <Header/>
            </div>
        </div>
    )
}

export default AppRoutes;