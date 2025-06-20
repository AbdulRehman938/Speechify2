import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormInput from './FormInput';
import { registerSchema } from '/src/validation/loginSchema.js';
import { AuthAPI, ImageAPI } from '/src/libs/api/apiEndpoints';

const OTP_TIMER = 600; // 10 minutes in seconds

const CreateAccountForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [profileImageFile, setProfileImageFile] = useState(null);
    const fileInputRef = useRef(null);

    // New states for OTP verification step
    const [currentStep, setCurrentStep] = useState('registration'); // 'registration' or 'otpVerification'
    const [emailForOtp, setEmailForOtp] = useState(''); // Store email for OTP APIs
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(OTP_TIMER);
    const [canResend, setCanResend] = useState(false);
    const timerRef = useRef(); // Ref for the timer interval

    // Timer effect for OTP countdown
    useEffect(() => {
        if (currentStep === 'otpVerification' && timer > 0) {
            timerRef.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        if (timer === 0) {
            setCanResend(true);
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current); // Cleanup on component unmount or state change
    }, [currentStep, timer]);

    const notifyError = (message) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 2000,
            theme: 'colored',
        });
    };

    const notifySuccess = (message) => {
        toast.success(message, {
            position: 'top-right',
            autoClose: 2000,
            theme: 'colored',
        });
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
        },
        validationSchema: registerSchema,
        validateOnBlur: false,
        validateOnChange: false, // Ensures validation only runs on submit or explicit calls
        onSubmit: async (values) => {
            const errors = await formik.validateForm();
            formik.setTouched(
                Object.keys(values).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                }, {})
            ); // Mark all fields as touched on submit

            if (Object.keys(errors).length > 0) {
                // Display all errors via toast
                Object.values(errors).forEach((msg) => notifyError(msg));
                return; // Stop submission if there are validation errors
            }

            try {
                let imageUrl = null;
                if (profileImageFile) {
                    const formData = new FormData();
                    formData.append('image', profileImageFile);

                    try {
                        const imageUploadResponse = await ImageAPI.uploadImage(formData);
                        imageUrl = imageUploadResponse.data.url;
                        notifySuccess("Profile image uploaded successfully!");
                    } catch (imageUploadError) {
                        notifyError(
                            imageUploadError?.response?.data?.message ||
                            imageUploadError?.message ||
                            'Profile image upload failed. Registration will proceed without image.'
                        );
                        // Do not return here if image upload is optional for registration
                    }
                }

                const registrationPayload = {
                    ...values,
                    ...(imageUrl && { profileImageUrl: imageUrl }),
                };

                const response = await AuthAPI.register(registrationPayload);

                if (response.status === 200) {
                    notifySuccess('Account created successfully! Sending OTP to your email.');
                    setEmailForOtp(values.email); // Store email for the next step
                    setCurrentStep('otpVerification'); // Transition to OTP step
                    setTimer(OTP_TIMER); // Start the timer
                    setCanResend(false); // Disable resend initially

                    // Immediately call verify-email API after successful registration
                    try {
                        await AuthAPI.verifyEmail({ email: values.email });
                        notifySuccess("OTP sent to your email!");
                    } catch (otpError) {
                        notifyError(
                            otpError?.response?.data?.message ||
                            otpError?.message ||
                            "Failed to send OTP. Please try resending."
                        );
                        // You might want to handle this more gracefully, perhaps stay on registration
                        // or allow resend without a successful initial send confirmation.
                    }

                } else {
                    notifyError("Something went wrong during registration.");
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

    const handleBlurWithToast = (e) => {
        const { name } = e.target;
        formik.handleBlur(e);
        // Show toast error immediately after blur if validation fails
        setTimeout(() => {
            if (formik.errors[name]) notifyError(formik.errors[name]);
        }, 100);
    };

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImageFile(file);
            notifySuccess(`Selected image: ${file.name}`);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // Handler for OTP input
    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6); // Allow only digits, max 6
        setOtp(value);
    };

    // Handler for resend OTP
    const handleResendOtp = async () => {
        if (!canResend || !emailForOtp) return;
        try {
            await AuthAPI.resendOtp({ email: emailForOtp });
            notifySuccess('OTP resent to your email!');
            setTimer(OTP_TIMER); // Reset timer
            setCanResend(false); // Disable resend until timer runs out
        } catch (error) {
            notifyError(
                error?.response?.data?.message ||
                error?.message ||
                'Failed to resend OTP'
            );
        }
    };

    // Handler for OTP verification (you'll need to define AuthAPI.verifyOtp in apiEndPoints.js)
    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            notifyError("Please enter a 6-digit OTP.");
            return;
        }
        try {
            // Placeholder: Call your actual verify OTP API here
            // const response = await AuthAPI.verifyOtp({ email: emailForOtp, otp });
            // For now, simulating success
            notifySuccess('OTP verified successfully!');
            setTimeout(() => navigate('/login'), 1000); // Redirect to login after successful OTP
        } catch (error) {
            notifyError(
                error?.response?.data?.message ||
                error?.message ||
                'OTP verification failed. Please try again.'
            );
            setOtp(''); // Clear OTP on failure
        }
    };

    // Format timer for display
    const formatTimer = (sec) => {
        const m = String(Math.floor(sec / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="h-[75vh] min-w-[23rem] max-w-[23rem] p-[20px] bg-[#fff] absolute inset-x-[48rem] inset-y-[5rem] text-white flex flex-col items-center rounded-[1rem] [box-shadow:0_0_0.5rem_0_#0000003b] transition-all duration-500 ease-in-out">
            <ToastContainer />

            {/* Logo - now part of the flex column flow */}
            <img
                className="min-w-[10rem] mt-4 mb-2" // Adjusted margins
                src="/src/assets/icons/Speechify-logo2.svg"
                alt="create-account-logo"
            />
            {/* Heading - now part of the flex column flow */}
            <h1 className="font-medium text-[#000] text-[2.2rem] mb-4">
                {currentStep === 'registration' ? 'Create your account' : 'Verify your email'}
            </h1>

            {currentStep === 'registration' ? (
                // Registration Form
                <form
                    className="flex flex-col gap-4 w-full justify-center items-center flex-grow" // flex-grow to take remaining space
                    onSubmit={formik.handleSubmit}
                >
                    {/* Upload Image Section */}
                    <div
                        className="w-full flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer bg-gray-100 border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-200"
                        onClick={triggerFileInput}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageSelect}
                            className="hidden"
                            accept="image/*"
                        />
                        <img
                            src="https://placehold.co/40x40/cccccc/ffffff?text=IMG"
                            alt="Upload Icon"
                            className="w-10 h-10 mb-2"
                        />
                        <p className="text-gray-700 text-sm font-semibold mb-1">
                            {profileImageFile ? profileImageFile.name : "Click to Upload Profile Image"}
                        </p>
                        <p className="text-gray-500 text-xs">
                            (or drag and drop)
                        </p>
                        <div className="flex gap-4 mt-2">
                            <img src="https://placehold.co/24x24/white/gray?text=G" alt="Google" title="Upload from Google" className="cursor-not-allowed opacity-50"/>
                            <img src="https://placehold.co/24x24/white/gray?text=D" alt="Drive" title="Upload from Drive" className="cursor-not-allowed opacity-50"/>
                            <img src="https://placehold.co/24x24/white/gray?text=A" alt="Apple" title="Upload from Apple" className="cursor-not-allowed opacity-50"/>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <FormInput
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={handleBlurWithToast}
                        />
                        <FormInput
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={handleBlurWithToast}
                        />
                        <FormInput
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={handleBlurWithToast}
                        />
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
                            icon={showPassword ? '/src/assets/images/Openeye.svg' : '/src/assets/images/Closedeye.svg'}
                            onIconClick={() => setShowPassword((prev) => !prev)}
                            autoComplete="new-password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-[3rem] bg-[#2f43fa] text-white rounded-[1rem] font-bold text-[1.2rem] hover:bg-[#1e2bfa] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Continue
                    </button>

                    <div className="w-full h-[2rem] flex flex-col text-center mt-2">
                        <p className="text-[0.8rem] font-bold text-[#000]">
                            Already have an account?
                            <span
                                className="text-[#2f43fa] ml-2 text-[1rem] cursor-pointer hover:underline"
                                onClick={() => navigate('/login')}
                            >
                                Log In
                            </span>
                        </p>
                    </div>
                </form>
            ) : (
                // OTP Verification Form
                <div className="flex flex-col gap-4 w-full justify-center items-center flex-grow"> {/* flex-grow added here too */}
                    <p className="text-gray-700 text-sm font-semibold text-center">
                        A 6-digit OTP has been sent to <span className="font-bold">{emailForOtp}</span>.
                        It expires in {formatTimer(timer)}.
                    </p>
                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={handleOtpChange}
                        className="w-full h-[3rem] bg-gray-200 border-[0.5px] text-black border-transparent rounded-[1rem] p-[0.5rem] text-[1rem] font-bold outline-none focus:border-blue-500 hover:bg-[#e2e2e2] tracking-widest text-center"
                        maxLength={6}
                        autoComplete="one-time-code"
                    />
                    <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="w-full h-[3rem] bg-[#2f43fa] text-white rounded-[1rem] font-bold text-[1.2rem] hover:bg-[#1e2bfa] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
                    >
                        Verify OTP
                    </button>

                    <div className="flex justify-center items-center gap-2 mt-2">
                        <span className="text-gray-400 text-[1rem]">|</span>
                        <button
                            onClick={handleResendOtp}
                            disabled={!canResend}
                            className={`bg-transparent font-bold text-[1rem] ${canResend ? 'text-[#2f43fa] hover:text-[#1e2bfa]' : 'text-gray-400 cursor-not-allowed'}`}
                        >
                            Resend OTP {canResend ? '' : `(${formatTimer(timer)})`}
                        </button>
                    </div>

                    <div className="w-full h-[2rem] flex flex-col text-center mt-4">
                        <p className="text-[0.8rem] font-bold text-[#000]">
                            Changed your mind?
                            <span
                                className="text-[#2f43fa] ml-2 text-[1rem] cursor-pointer hover:underline"
                                onClick={() => navigate('/login')}
                            >
                                Back to Login
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateAccountForm;
