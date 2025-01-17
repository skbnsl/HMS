import React from "react";
import { ActionIcon } from '@mantine/core';
import { IconAdjustments, IconBellRinging, IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';
import ProfileMenu from "./ProfileMenu.tsx";

const Header = () => {
    return (
        <div className='bg-cyan-100 w-full h-16 flex justify-between px-5 items-center'>
                  <ActionIcon variant="transparent" size="lg" aria-label="Settings">
                    <IconLayoutSidebarLeftCollapse style={{ width: '90%', height: '90%' }} stroke={1.5} />
                </ActionIcon>

                

                <div className="flex gap-5 items-center">
                <ActionIcon variant="transparent" size="md" aria-label="Settings">
                    <IconBellRinging style={{ width: '90%', height: '90%' }} stroke={2} />
                </ActionIcon>
                    <ProfileMenu/>
                </div>
        </div>
    )
}

export default Header;