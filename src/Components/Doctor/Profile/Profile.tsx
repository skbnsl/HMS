import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import {DateInput} from "@mantine/dates";
import { IconEdit } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doctorSpecialization,doctorDepartments } from "../../../Data/Dropdown.tsx";
import { useDisclosure } from "@mantine/hooks";
import { getDoctor, updateDoctor } from "../../../Service/DoctorProfileService.tsx";
import { useForm } from "@mantine/form";
import { formatDate } from "../../../Utility/DateUtility.tsx";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil.tsx";

const doctor:any = {
    name:"Dr. John Doe",
    email:"dr.john.doe@example.com",
    dob:"1985-07-25",
    phone:"+91 9933399333",
    address:"45-B, Camelia, Gurgaon, India",
    licenseNo:"DL12345XYZ",
    specialization:"Cardiology",
    department:"Cardiology",
    totalExp:10,
    profilePictue:"https://randomuser.me/api/portraits/75.jpg"
};

const Profile = () => {
    const user = useSelector((state:any)=>state.user);
    const [opened, {open, close}] = useDisclosure(false);
    const [editMode, setEdit] = useState(false);
    const [profile, setProfile] = useState<any>({});
    useEffect(()=>{
        getDoctor(user.profileId).then((data)=>{
            setProfile({...data});
        }).catch((error)=>{
            console.error(error);
        })
    }, [])
    const form = useForm({
        initialValues:{
            dob : '',
            phone : '',
            address : '',
            licenseNo : '',
            specialization : '',
            department : '',
            totalExp : ''
        },

        validate : {
            //email : (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid Email'),
            dob : (value) => !value ? 'Date of birth is required' : undefined,
            phone : (value) => !value ? 'phone number is required' : undefined,
            address : (value) => !value ? 'address is required' : undefined,
            licenseNo : (value) => !value ? 'License Number is required' : undefined,
        }
    })

    const handleEdit = () => {
        form.setValues({...profile, dob:profile.dob ? new Date(profile.dob) : undefined});
        setEdit(true);
    }

    const handleSubmit = (e:any) => {
        let values = form.getValues();
        form.validate();
        if(!form.isValid()) return;
        console.log(values);
        updateDoctor({...profile,...values}).then((_data)=>{
            setProfile({...profile, ...values});
            setEdit(false);
            successNotification("Profile updated successfully");
        }).catch((error)=>{
            console.error(error);
            errorNotification(error.response.data.errorMessage);
        })
    }

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
                    <Table.Tbody className="{&>tr}:!mb-3 [&_td]:!w-1/2">
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
                                <Table.Td className="font-semibold text-xl">License No.</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <TextInput {...form.getInputProps("LicenseNo")} placeholder="License Number" maxLength={20}/></Table.Td> 
                                  : <Table.Td className="text-xl">{profile.licenseNo ?? '-'}</Table.Td>
                                }
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Specialization</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <Select {...form.getInputProps("specialization")} placeholder="Specialization" data={doctorSpecialization}/></Table.Td> 
                                  : <Table.Td className="text-xl">{profile.specialization ?? '-'}</Table.Td>
                                }
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Department</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <Select {...form.getInputProps("department")} placeholder="Department" data={doctorDepartments}/> </Table.Td> 
                                  : <Table.Td className="text-xl">{profile.department ?? '-'}</Table.Td>
                                }
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td className="font-semibold text-xl">Total Experience</Table.Td>
                                {editMode ?  <Table.Td className="text-xl">
                                    <NumberInput {...form.getInputProps("totalExp")} maxLength={2} max={55} clampBehavior="strict" placeholder="Total Experience" hideControls/> </Table.Td> 
                                  : <Table.Td className="text-xl">{profile.totalExp ?? '-'} {profile.totalExp ? 'years':''}</Table.Td>
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