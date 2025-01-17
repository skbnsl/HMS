import { IconHeartbeat } from "@tabler/icons-react";
import React from "react";

const Sidebar = () => {
    return (
        <div className='w-64 bg-red-200 flex flex-col gap-8 items-center pt-3'>
            <div className="text-red-500 flex gap-1 items-center">
                <IconHeartbeat size={40} stroke={2.5}/>
                <span className="font-heading font-semibold text-3xl">Pulse</span>
            </div>
        </div>
    )
}

export default Sidebar;