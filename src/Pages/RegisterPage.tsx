import { Button, PasswordInput, SegmentedControl, TextInput } from '@mantine/core'
import { IconHeartbeat } from '@tabler/icons-react'
import { useForm } from '@mantine/form';
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {registerUser}  from '../Service/UserService.tsx'
import { errorNotification, successNotification } from '../Utility/NotificationUtil.tsx';


const RegisterPage = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
          const form = useForm({
                    //mode: 'uncontrolled',
                    initialValues: {
                      name:'',
                      type:'PATIENT',
                      email: '',
                      password: '',
                      confirmPassword:''
                    },

                    validate: {
                      name:(value)=>(!value?"Name is required":null),
                      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
                      password: (value) => !value?"password is required"
                        :!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value)
                        ?"Password must be 8-15 character long, include uppercase and lowercase, number and special character"
                        :null,
                      confirmPassword: (value, values) => 
                          (value===values.password ? null:`password doesn't match`),
                    },
                  });

const handleSubmit = (values: typeof form.values) => {
  setLoading(true);
  console.log(values);
  registerUser(values).then((data)=>{
    successNotification("Registered Successfully!");
    console.log("data:",data);
    navigate("/login");
  }).catch((error)=>{
    console.error(error);
    errorNotification(error.response.data.errorMessage);
  }).finally(()=>setLoading(false))
};

return (
    <div style={{background:'url("/bg.jpg")'}} className='h-screen w-screen !bg-cover !bg-center !bg-no-repeat 
      flex flex-col items-center justify-center'>
          <div className="py-3 text-pink-500 flex gap-1 items-center">
                <IconHeartbeat size={45} stroke={2.5}/>
                <span className="font-heading font-semibold text-4xl">Pulse</span>
            </div>
          <div className='w-[450px] backdrop-blur-md p-10 py-8 rounded-lg'>
                    <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-5 [&_input]:placeholder-neutral-100 
                     [&_.mantine-Input-input]:!border-white focus-within:[&_.mantine-Input-input]:!border-pink-400
                      [&_.mantine-Input-input]:!border 
                     [&_input]:pl-2 [&_svg]:text-white [&_input]:!text-black'>
                              <div className='self-center font-medium font-heading text-white text-xl'>Register</div>
                              <SegmentedControl {...form.getInputProps("type")} fullWidth size="md" radius="md" color='blue' bg='none'
                                  className='[&_*]:!text-white border border-white' 
                                  data={[{label:'Patient', value:'PATIENT'}, 
                                  {label:'Doctor', value:'Doctor'}, {label:'Admin', value:'ADMIN'},]} />
                              <TextInput {...form.getInputProps('name')} variant='unstyled' className='transition duration-300' size='md' radius='md' placeholder='Your Name' autoComplete='off'/>
                              <TextInput {...form.getInputProps('email')} variant='unstyled' className='transition duration-300' size='md' radius='md' placeholder='Email' autoComplete='off'/>
                              <PasswordInput {...form.getInputProps('password')} variant='unstyled' className='transition duration-300' size='md' radius='md' placeholder='password' autoComplete='off'/>
                              <PasswordInput {...form.getInputProps('confirmPassword')} variant='unstyled' className='transition duration-300' size='md' radius='md' placeholder='Confirm Password' autoComplete='off'/>
                              <Button loading={loading} radius='md' size='md' type='submit' color='pink' >Register</Button>
                              <div className='text-neutral-100 text-sm self-center'>
                                Have an account? 
                                <Link to="/login" className='hover:underline'>Login</Link>
                              </div>
                    </form>
          </div>
    </div>
  )
}
 
export default RegisterPage;