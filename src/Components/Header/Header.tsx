import React from "react";
import { ActionIcon, Button } from '@mantine/core';
import { IconAdjustments, IconBellRinging, IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';
import ProfileMenu from "./ProfileMenu.tsx";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className='bg-light shadown-lg w-full h-16 flex justify-between px-5 items-center'>
                  <ActionIcon variant="transparent" size="lg" aria-label="Settings">
                    <IconLayoutSidebarLeftCollapse style={{ width: '90%', height: '90%' }} stroke={1.5} />
                </ActionIcon>

                

                <div className="flex gap-5 items-center">
                    <Link to="Login"><Button>Login</Button></Link>
                <ActionIcon variant="transparent" size="md" aria-label="Settings">
                    <IconBellRinging style={{ width: '90%', height: '90%' }} stroke={2} />
                </ActionIcon>
                    <ProfileMenu/>
                </div>
        </div>
    )
}

export default Header;