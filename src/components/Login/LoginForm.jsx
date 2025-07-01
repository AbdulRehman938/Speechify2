import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialLoginButtons from './SocialLoginButtons';
import FormInput from './FormInput';
import { fullLoginSchema } from '/src/validation/loginSchema.js';
import { AuthAPI } from '/src/libs/api/apiEndpoints';
import logo2 from "../../assets/icons/Speechify-logo2.svg";
const openeye = new URL('../../assets/images/Openeye.svg', import.meta.url).href;
const closedeye = new URL('../../assets/images/Closedeye.svg', import.meta.url).href;

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 2000,
      theme: 'colored'
    });
  };

  const notifySuccess = (message) => { // Added notifySuccess for completeness
    toast.success(message, {
      position: 'top-right',
      autoClose: 2000,
      theme: 'colored'
    });
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: fullLoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const errors = await formik.validateForm();

      if (Object.keys(errors).length > 0) {
        Object.values(errors).forEach((msg) => notifyError(msg));
        return;
      }
      try {
        const response = await AuthAPI.login(values);

        // --- START OF CRITICAL CHANGE ---
        // Log the full response to inspect it in your browser's console
        console.log('AuthAPI.login Response:', response);

        // Check the HTTP status code from the response
        if (response.status === 200) { // Assuming 200 OK for successful login
          // Now that we know it's a success, check if the expected data is present
          if (response.data && response.data.token && response.data.user) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            notifySuccess('Login successful!'); // Add a success toast!

            if (response.data.user.role === 'admin' || response.data.user.role === 'superadmin') {
              navigate('/admin-dashboard');
            } else {
              navigate('/library');
            }
          } else {
            // This means the API returned 200, but the data structure was unexpected
            notifyError('Login successful, but missing token or user data in response.');
          }
        } else {
          // If status is NOT 200, it's an error. Use the statusMessage from methods.js
          // This will correctly show messages like "Invalid credentials" or "User not found"
          notifyError(response.statusMessage || 'Login failed: An unexpected error occurred.');
        }
        // --- END OF CRITICAL CHANGE ---

      } catch (error) {
        // This catch block is for network errors or errors not structured by methods.js errorHandler
        notifyError(
          error?.statusMessage || // Prioritize message from our error handler
          error?.message ||
          'Login failed due to an unexpected client-side error.'
        );
      }
    },
  });

  const handleBlurWithToast = (e) => {
    const { name } = e.target;
    formik.handleBlur(e);
    setTimeout(() => {
      if (formik.errors[name]) notifyError(formik.errors[name]);
    }, 100);
  };

  return (
    <div className="h-[70vh] min-w-[23rem] max-w-[23rem] p-[20px] bg-[#fff] text-white flex justify-center items-center rounded-[1rem] [box-shadow:0_0_0.5rem_0_#0000003b] transition-all duration-500 ease-in-out">
      <ToastContainer />

      <form className='flex flex-col gap-4 w-full justify-center items-center' onSubmit={formik.handleSubmit}>
        <img className='min-w-[10rem] absolute inset-y-[10rem]' src={logo2} alt="login-logo" />
        <h1 className='font-medium text-[#000] relative inset-y-[1rem] text-[2.5rem]'>Welcome Back</h1>

        <SocialLoginButtons />

        <div className="w-full h-[1rem] relative flex items-center justify-center bg-transparent inset-y-[0rem]">
          <div className="bg-[#c2c0c0] w-full absolute h-[0.1rem] z-10 left-0 top-1/2 -translate-y-1/2"></div>
          <p className="text-[1.1rem] font-semibold text-[#c2c0c0] bg-[#fff] w-[3rem] z-20 flex justify-center items-center relative top-1/2 -translate-y-1/2">or</p>
        </div>

        <div className='flex flex-col gap-2 w-full relative inset-y-[1rem]'>
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={handleBlurWithToast}
          />
          <FormInput
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={handleBlurWithToast}
            icon={showPassword ? openeye : closedeye}
            onIconClick={() => setShowPassword(prev => !prev)}
            autoComplete="current-password"
          />

        </div>

        <button type='submit' className='w-full h-[3rem] bg-[#2f43fa] text-white rounded-[1rem] font-bold text-[1.2rem] hover:bg-[#1e2bfa] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 relative inset-y-[1rem]'>
          Log In
        </button>

        <div className='w-full h-[3rem] flex flex-col text-center relative top-[1rem]'>
          <p className='text-[#2f43fa] text-[1rem] font-semibold cursor-pointer hover:underline'
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </p>
          <p className='text-[0.8rem] font-bold text-[#000] relative top-[1rem]'>
            Don’t have an account?
            <span className='text-[#2f43fa] ml-2 text-[1rem] cursor-pointer hover:underline'
              onClick={() => navigate('/create-account')}
            >
              Create Account
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;