import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormInput from './FormInput';
import { registerSchema } from '/src/validation/loginSchema.js';
import { AuthAPI, ImageAPI } from '../../libs/api/apiEndPoints'; // Imported ImageAPI

const CreateAccountForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [profileImageFile, setProfileImageFile] = useState(null); // State to store the selected image file
    const fileInputRef = useRef(null); // Ref for the hidden file input

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
        validateOnChange: false,
        onSubmit: async (values) => {
            const errors = await formik.validateForm();

            if (Object.keys(errors).length > 0) {
                Object.values(errors).forEach((msg) => notifyError(msg));
                return;
            }

            try {
                // If a profile image is selected, attempt to upload it first
                let imageUrl = null;
                if (profileImageFile) {
                    const formData = new FormData();
                    formData.append('image', profileImageFile); // 'image' should match your backend's expected field name

                    try {
                        // IMPORTANT: Ensure your 'postRequest' method in methods.js can handle FormData
                        // If it JSON.stringify()s the body, this call will likely fail for file uploads.
                        // You might need a dedicated 'uploadRequest' helper that does NOT stringify the body
                        // and lets the browser set 'Content-Type: multipart/form-data'.
                        const imageUploadResponse = await ImageAPI.uploadImage(formData);
                        // Assuming the API returns a response like { success: true, data: { url: '...' } }
                        imageUrl = imageUploadResponse.data.url; 
                        notifySuccess("Profile image uploaded successfully!");
                    } catch (imageUploadError) {
                        notifyError(
                            imageUploadError?.response?.data?.message ||
                            imageUploadError?.message ||
                            'Profile image upload failed. Registration will proceed without image.'
                        );
                        // Optionally, you might choose to 'return' here if image upload is mandatory for registration
                    }
                }

                // Proceed with user registration, potentially including the image URL
                const registrationPayload = {
                    ...values,
                    ...(imageUrl && { profileImageUrl: imageUrl }), // Add image URL to payload if uploaded
                };

                const response = await AuthAPI.register(registrationPayload);

                if (response.status === 200) {
                    toast.success('Account created successfully!', {
                        position: 'top-right',
                        autoClose: 2000,
                        theme: 'colored',
                    });
                    navigate('/login');
                } else {
                    toast.error("Something went wrong during registration.");
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

    return (
        <div className="h-[75vh] min-w-[23rem] max-w-[23rem] p-[20px] bg-[#fff] absolute inset-x-[48rem] inset-y-[5rem] text-white flex justify-center items-center rounded-[1rem] [box-shadow:0_0_0.5rem_0_#0000003b] transition-all duration-500 ease-in-out">
            <ToastContainer />

            <form
                className="flex flex-col gap-4 w-full justify-center items-center"
                onSubmit={formik.handleSubmit}
            >
                <img
                    className="min-w-[10rem] absolute inset-y-[1.5rem]"
                    src="/src/assets/icons/Speechify-logo2.svg"
                    alt="create-account-logo"
                />
                <h1 className="font-medium text-[#000] relative inset-y-[0rem] text-[2.2rem]">
                    Create your account
                </h1>

                {/* Upload Image Section */}
                <div
                    className="w-full flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer bg-gray-100 border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-200 relative inset-y-[0rem]"
                    onClick={triggerFileInput}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        className="hidden" // Hide the default file input
                        accept="image/*" // Only accept image files
                    />
                    <img
                        src="https://placehold.co/40x40/cccccc/ffffff?text=IMG" // Generic image icon
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
                        {/* Placeholder for Google, Drive, Apple icons */}
                        <img src="https://placehold.co/24x24/white/gray?text=G" alt="Google" title="Upload from Google" className="cursor-not-allowed opacity-50"/>
                        <img src="https://placehold.co/24x24/white/gray?text=D" alt="Drive" title="Upload from Drive" className="cursor-not-allowed opacity-50"/>
                        <img src="https://placehold.co/24x24/white/gray?text=A" alt="Apple" title="Upload from Apple" className="cursor-not-allowed opacity-50"/>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full relative inset-y-[0rem] ">
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
                        icon={
                            showPassword
                                ? '/src/assets/images/Openeye.svg'
                                : '/src/assets/images/Closedeye.svg'
                        }
                        onIconClick={() => setShowPassword((prev) => !prev)}
                        autoComplete="new-password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full h-[3rem] bg-[#2f43fa] text-white rounded-[1rem] font-bold text-[1.2rem] hover:bg-[#1e2bfa] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 relative inset-y-[0rem]"
                >
                    Continue
                </button>

                <div className="w-full h-[2rem] flex flex-col text-center relative inset-y-[0rem] ">
                    <p className="text-[0.8rem] font-bold text-[#000] mt-[0rem]">
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
        </div>
    );
};

export default CreateAccountForm;