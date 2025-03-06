import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import {DateInput} from "@mantine/dates";
import { IconEdit } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bloodGroups } from "../../../Data/Dropdown.tsx";
import { useDisclosure } from "@mantine/hooks";
import { getPatient, updatePatient } from "../../../Service/PatientProfileService.tsx";
import { formatDate } from "../../../Utility/DateUtility.tsx";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil.tsx";

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
    const [profile, setProfile] = useState<any>({});
    useEffect(()=>{
        getPatient(user.profileId).then((data)=>{
            setProfile(data);
        }).catch((error)=>{
            console.error(error);
        })
    }, [])
    const form = useForm({
        initialValues:{
            dob : profile.dob,
            phone : profile.phone,
            address : profile.address,
            aadharNo : profile.aadharNo,
            bloodGroup : profile.bloodGroup,
            allergies : profile.allergies,
            chronicDisease : profile.chronicDisease
        },

        validate : {
            //email : (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid Email'),
            dob : (value) => !value ? 'Date of birth is required' : undefined,
            phone : (value) => !value ? 'phone number is required' : undefined,
            address : (value) => !value ? 'address is required' : undefined,
            aadharNo : (value) => !value ? 'Aadhar Number is required' : undefined,
        }
    })

    const handleEdit = () => {
        
    }

    const handleSubmit = (values:any) => {
        console.log(values);
        updatePatient({...profile,...values}).then((data)=>{
            setProfile(data);
            setEdit(false);
            successNotification("Profile updated successfully");
        }).catch((error)=>{
            console.error(error);
            errorNotification(error.response.data.errorMessage);
        })
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)} className="p-10">
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
            {!editMode ? <Button type="button" size="lg" onClick={/*()=>setEdit(true)*/ handleEdit} variant="filled" leftSection={<IconEdit/>}>Edit</Button>:
            <Button size="lg" type="submit" /*onClick={()=>setEdit(false)}*/ variant="filled"> submit </Button>}
            </div>
            <Divider my={"xl"}/>
            <div>
                <div className="text-2xl font-medium mb-5 text-neutral-900">Personal Information</div>
                    <Table striped stripedColor="primary.1" verticalSpacing="md" withRowBorders={false}>
                        <Table.Tbody className="{&>tr}:!mb-3">
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Date Of Birth</Table.Td>
                                {editMode ?  <Table.Td className="text-xl"><DateInput {...form.getInputProps("dob")} placeholder="Date of birth"/>
                                    </Table.Td> 
                                  : <Table.Td className="text-xl">{formatDate(profile.dob) ?? '-'}</Table.Td>
                                }
                                
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Phone</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <NumberInput placeholder="Phone Number" {...form.getInputProps("phone")} maxLength={10} clampBehavior="strict" hideControls/></Table.Td> 
                                  : <Table.Td className="text-xl">{profile.phone ?? '-'}</Table.Td>
                                }
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Address</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <TextInput {...form.getInputProps("address")} placeholder="Address"/></Table.Td>
                                  : <Table.Td className="text-xl">{profile.address ?? '-'}</Table.Td>
                                }
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Aadhar No</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <NumberInput {...form.getInputProps("aadharNo")} placeholder="Aadhar Number" maxLength={12} clampBehavior="strict" hideControls/></Table.Td> 
                                  : <Table.Td className="text-xl">{profile.aadharNo ?? '-'}</Table.Td>
                                }
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Blood Group</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <Select {...form.getInputProps("bloodGroup")} placeholder="Blood Group" data={bloodGroups}/></Table.Td> 
                                  : <Table.Td className="text-xl">{profile.bloodGroup ?? '-'}</Table.Td>
                                }
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">allergies</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <TagsInput {...form.getInputProps("allergies")} placeholder="Allegeries separated by comma"/> </Table.Td> 
                                  : <Table.Td className="text-xl">{profile.allergies ?? '-'}</Table.Td>
                                }
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Chronic Disease</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <TagsInput {...form.getInputProps("chronicDisease")} placeholder="Chronic Diseases separated by comma"/></Table.Td> 
                                  : <Table.Td className="text-xl">{profile.chronicDisease ?? '-'}</Table.Td>
                                }
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
            </div>
            <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Profile Picture</span>}>
                {}
            </Modal>
        </form>
    )
}

export default Profile;