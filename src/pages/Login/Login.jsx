import React from 'react';
import LoginForm from '../../components/Login/LoginForm';

const Login = () => {
  return (
    <div className='h-screen w-screen bg-[#f1f4f9] flex justify-center items-center font-poppins flex-col'>
      <LoginForm />
      <p className='absolute bottom-[0rem] text-[#0000006c] text-[1rem] inset-y-[58.5rem]'>
        By Continuing you accept our <span className='text-[#0000006c] cursor-pointer hover:underline'>Terms of Service</span> and <span className='text-[#0000006c] cursor-pointer hover:underline'>Privacy Policy</span>.
      </p>
    </div>
  );
};

export default Login;