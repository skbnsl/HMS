import { Button, PasswordInput, TextInput } from '@mantine/core'
import { IconHeartbeat } from '@tabler/icons-react'
import { useForm } from '@mantine/form';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/UserService.tsx';
import {jwtDecode} from 'jwt-decode';
import { errorNotification, successNotification } from '../Utility/NotificationUtil.tsx';
import { useDispatch } from 'react-redux';
import { setJwt } from '../Slices/JwtSlice.tsx';
import { setUser } from '../Slices/UserSlice.tsx';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
          const form = useForm({
                    //mode: 'uncontrolled',
                    initialValues: {
                      email: '',
                      password: '',
                    },
                
                    validate: {
                      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
                      password: (value) => (!value?"password is required":null),
                    },
                  });

const handleSubmit = (values: typeof form.values) => {
  setLoading(true);
  loginUser(values).then((_data)=>{
    successNotification("logged In Successfully");
    dispatch(setJwt(_data));
    dispatch(setUser(jwtDecode(_data)));  
  }).catch((error)=>{
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
                              <div className='self-center font-medium font-heading text-white text-xl'>Login</div>
                              <TextInput {...form.getInputProps('email')} variant='unstyled' className='transition duration-300' size='md' radius='md' placeholder='Email' autoComplete='off'/>
                              <PasswordInput {...form.getInputProps('password')} variant='unstyled' className='transition duration-300' size='md' radius='md' placeholder='password' autoComplete='off'/>
                              <Button loading={loading} radius='md' size='md' type='submit' color='blue' className=''>Login</Button>
                              <div className='text-neutral-100 text-sm self-center'>
                                Don't have an account? 
                                <Link to="/register" className='hover:underline'>Register</Link>
                              </div>
                    </form>
          </div>
    </div>
  )
}
 
export default LoginPage; 