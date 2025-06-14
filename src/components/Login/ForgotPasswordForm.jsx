import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { emailOnlySchema } from '/src/validation/loginSchema.js';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from '../../libs/api/apiEndPoints';

const OTP_TIMER = 600; // 10 minutes in seconds

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(OTP_TIMER);
  const [canResend, setCanResend] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const timerRef = useRef();

  useEffect(() => {
    if (showOtp && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (timer === 0) {
      setCanResend(true);
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [showOtp, timer]);

  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 2000,
      theme: 'colored',
    });
  };

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: emailOnlySchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const errors = await formik.validateForm();
      formik.setTouched({ email: true }, true);

      if (Object.keys(errors).length > 0) {
        Object.values(errors).forEach((msg) => notifyError(msg));
        return;
      }

      try {
        const response = await AuthAPI.verifyEmail(values);
        if (response.status === 200) {
          toast.success('A 6-digit reset otp sent to your email!', {
            position: 'top-right',
            autoClose: 2000,
            theme: 'colored',
          });
          setShowOtp(true);
          setTimer(OTP_TIMER);
          setCanResend(false);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        notifyError(
          error?.response?.data?.message ||
          error?.message ||
          'Registration failed'
        );
      }
    },
  });

  // Handler for OTP input
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  // Handler for resend OTP
  const handleResendOtp = async () => {
    if (!canResend) return;
    try {
      await AuthAPI.resendOtp({ email: formik.values.email });
      toast.success('OTP resent to your email!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      });
      setTimer(OTP_TIMER);
      setCanResend(false);
    } catch (error) {
      notifyError(
        error?.response?.data?.message ||
        error?.message ||
        'Failed to resend OTP'
      );
    }
  };

  // Handler for OTP submit
  const handleOtpSubmit = async () => {
    try {
      const response = await AuthAPI.verifyOtp({ email: formik.values.email, otp });
      if (response.status === 200) {
        toast.success('OTP verified! Please enter your new password.', {
          position: 'top-right',
          autoClose: 2000,
          theme: 'colored',
        });
        setIsOtpVerified(true);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Wrong OTP, please re-enter OTP', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      });
      setOtp('');
    }
  };

  // Handler for new password submit
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await passwordSchema.validate({ password });
      setPasswordError('');
      // Call your reset password API here
      await AuthAPI.resetPassword({ email: formik.values.email, password });
      toast.success('Password reset successfully!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setPasswordError(err.message);
    }
  };

  const formatTimer = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className='min-h-screen w-full bg-[#f5f5fa] flex justify-center items-center relative overflow-hidden'>
      <div className='w-[28rem] h-[22rem] bg-white flex justify-center items-center rounded-[2rem] shadow-lg transition-all duration-500 ease-in-out'>
        <div className="w-[23rem] h-[20rem] mt-[6rem] flex flex-col items-center">
          <ToastContainer />
          <img
            className="min-w-[10rem] absolute inset-y-[20rem]"
            src="/src/assets/icons/Speechify-logo2.svg"
            alt="logo"
          />

          <h1 className="text-[#000] text-[1.8rem] font-bold relative inset-y-[-1rem]">
            Forgot Your Password?
          </h1>

          <p className="text-black text-[0.8rem] relative inset-y-[2rem] font-semibold">
            {!showOtp
              ? 'Enter your email address to reset your password'
              : isOtpVerified
              ? 'Enter your new password'
              : 'Enter OTP'}
          </p>

          {!showOtp ? (
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center"
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-[3rem] bg-gray-200 border-[0.5px] text-black border-transparent relative top-[3rem] rounded-[1rem] p-[0.5rem] text-[1rem] font-bold outline-none focus:border-blue-500 hover:bg-[#e2e2e2]"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 font-bold text-[1rem] mt-[1rem] absolute top-[32rem]">
                  {formik.errors.email}
                </div>
              )}

              <button
                type="submit"
                className="w-full h-[3rem] bg-[#2f43fa] mt-[5rem] text-white rounded-[1rem] font-bold text-[1.2rem] hover:bg-[#1e2bfa] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
              >
                Continue
              </button>
            </form>
          ) : !isOtpVerified ? (
            <form className="w-full flex flex-col items-center" onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                name="otp"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={handleOtpChange}
                className="w-full h-[3rem] bg-gray-200 border-[0.5px] text-black border-transparent relative top-[3rem] rounded-[1rem] p-[0.5rem] text-[1rem] font-bold outline-none focus:border-blue-500 hover:bg-[#e2e2e2] tracking-widest text-center"
                maxLength={6}
                autoComplete="one-time-code"
              />
              <button
                type="button"
                className="w-full h-[3rem] bg-[#2f43fa] mt-[5rem] text-white rounded-[1rem] font-bold text-[1.2rem] hover:bg-[#1e2bfa] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
                onClick={handleOtpSubmit}
              >
                Verify OTP
              </button>
            </form>
          ) : (
            <form className="w-full flex flex-col items-center" onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-[3rem] bg-gray-200 border-[0.5px] text-black border-transparent relative top-[3rem] rounded-[1rem] p-[0.5rem] text-[1rem] font-bold outline-none focus:border-blue-500 hover:bg-[#e2e2e2] text-center"
                autoComplete="new-password"
              />
              {passwordError && (
                <div className="text-red-500 font-bold text-[1rem] mt-2">
                  {passwordError}
                </div>
              )}
              <button
                type="submit"
                className="w-full h-[3rem] bg-[#2f43fa] mt-[2rem] text-white rounded-[1rem] font-bold text-[1.2rem] hover:bg-[#1e2bfa] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
              >
                Reset Password
              </button>
            </form>
          )}

          {showOtp && !isOtpVerified && (
            <div className="flex flex-row justify-center items-center gap-2 mt-4">
              <span className="text-gray-400 text-[1rem]">|</span>
              <button
                onClick={handleResendOtp}
                disabled={!canResend}
                className={`bg-transparent font-bold text-[1rem] ${canResend
                  ? 'text-[#2f43fa] hover:text-[#1e2bfa]'
                  : 'text-gray-400 cursor-not-allowed'
                  }`}
              >
                Resend OTP {canResend ? '' : `(${formatTimer(timer)})`}
              </button>
            </div>
          )}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-transparent text-[#2f43fa] font-bold text-[1rem] hover:cursor-pointer hover:text-[#2f43fa63] scale-105"
            >
              Back to Login
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;