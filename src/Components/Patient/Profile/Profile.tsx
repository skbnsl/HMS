import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import {DateInput} from "@mantine/dates";
import { IconEdit } from "@tabler/icons-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { bloodGroups } from "../../../Data/Dropdown.tsx";
import { useDisclosure } from "@mantine/hooks";

const patient:any = {
    name:"John Doe",
    email:"john.doe@example.com",
    dob:"1990-05-15",
    phone:"+91 7878787878",
    address:"123, Main Street, Mumbai, India",
    aadharNo:"1234-5678-9012",
    bloodGroup:"O+",
    allergies:"Peanuts",
    chronicDisease:"TSH",
    profilePictue:"https://randomuser.me/api/portraits/75.jpg"
};

const Profile = () => {
    const user = useSelector((state:any)=>state.user);
    const [opened, {open, close}] = useDisclosure(false);
    const [editMode, setEdit] = useState(false);
    return (
        <div className="p-10">
            <div className="flex justify-between items-center">
            <div className="flex gap-5 items-center" >
                <div className="flex flex-col items-center gap-3">
                <Avatar variant='filled' src="/avatar.jpg" size={150} alt="it's me" />
                {editMode && <Button size="sm" onClick={open} variant="filled"> upload </Button>}    
                </div>
                <div className="flex flex-col gap-3">
                    <div className="text-3xl font-medium text-neutral-900">{user.name}</div>
                    <div className="text-xl text-neutral-700">{user.email}</div>
                </div>
            </div>
            {!editMode ? <Button size="lg" onClick={()=>setEdit(true)} variant="filled" leftSection={<IconEdit/>}>Edit</Button>:
            <Button size="lg" onClick={()=>setEdit(false)} variant="filled"> submit </Button>}
            </div>
            <Divider my={"xl"}/>
            <div>
                <div className="text-2xl font-medium mb-5 text-neutral-900">Personal Information</div>
                    <Table striped stripedColor="primary.1" verticalSpacing="md" withRowBorders={false}>
                        <Table.Tbody className="{&>tr}:!mb-3">
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Date Of Birth</Table.Td>
                                {editMode ?  <Table.Td className="text-xl"><DateInput placeholder="Date of birth"/>
                                    </Table.Td> 
                                  : <Table.Td className="text-xl">{patient.dob}</Table.Td>
                                }
                                
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Phone</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <NumberInput placeholder="Phone Number" maxLength={10} clampBehavior="strict" hideControls/></Table.Td> 
                                  : <Table.Td className="text-xl">{patient.phone}</Table.Td>
                                }
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Address</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <TextInput placeholder="Address"/></Table.Td> 
                                  : <Table.Td className="text-xl">{patient.address}</Table.Td>
                                }
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Aadhar No</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <NumberInput placeholder="Aadhar Number" maxLength={12} clampBehavior="strict" hideControls/></Table.Td> 
                                  : <Table.Td className="text-xl">{patient.aadharNo}</Table.Td>
                                }
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Blood Group</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <Select placeholder="Blood Group" data={bloodGroups}/></Table.Td> 
                                  : <Table.Td className="text-xl">{patient.bloodGroup}</Table.Td>
                                }
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">allergies</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <TagsInput placeholder="Allegeries separated by comma"/> </Table.Td> 
                                  : <Table.Td className="text-xl">{patient.allergies}</Table.Td>
                                }
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Chronic Disease</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <TagsInput placeholder="Chronic Diseases separated by comma"/></Table.Td> 
                                  : <Table.Td className="text-xl">{patient.chronicDisease}</Table.Td>
                                }
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
            </div>
            <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Profile Picture</span>}>
                {}
            </Modal>
        </div>
    )
}

export default Profile;