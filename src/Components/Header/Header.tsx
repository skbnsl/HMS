import React, { useEffect } from "react";
import { ActionIcon, Button } from '@mantine/core';
import { IconAdjustments, IconBellRinging, IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';
import ProfileMenu from "./ProfileMenu.tsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {removeJwt} from '../../Slices/JwtSlice.tsx';
import { removeuser } from "../../Slices/UserSlice.tsx";

const Header = () => {
    const dispatch = useDispatch();
    const jwt = useSelector((state:any)=>state.jwt);
    const handleLogout = () => {
        console.log("LOGOUT");
        dispatch(removeJwt());
        dispatch(removeuser());
    }

    return (
        <div className='bg-light shadown-lg w-full h-16 flex justify-between px-5 items-center'>
                  <ActionIcon variant="transparent" size="lg" aria-label="Settings">
                    <IconLayoutSidebarLeftCollapse style={{ width: '90%', height: '90%' }} stroke={1.5} />
                </ActionIcon>

                

                <div className="flex gap-5 items-center">
                    {jwt?<Button color="red" onClick={handleLogout}>Logout</Button>:<Link to="Login"><Button>Login</Button></Link>}
                {jwt && <><ActionIcon variant="transparent" size="md" aria-label="Settings">
                    <IconBellRinging style={{ width: '90%', height: '90%' }} stroke={2} />
                </ActionIcon>
                <ProfileMenu/></>}
                </div>
        </div>
    )
}

export default Header;