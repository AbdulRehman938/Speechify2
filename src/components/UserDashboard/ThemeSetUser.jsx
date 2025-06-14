import React from 'react';
import ThemeToggle from '/src/components/UserDashboard/ThemeToggle.jsx';

const ThemeSetUser = () => (
    <>
        <div className='bg-white w-full h-[15%] relative rounded-[1rem] border-b-2 border-b-[#e9eaf0] flex flex-col items-center justify-between top-[1rem]'>
            <div className='bg-white h-[3rem] w-full relative top-[-1rem] flex flex-wrap justify-between items-center'>
                <span className='font-semibold text-[1.3rem] ml-[2rem]'>App Theme</span>
                <div id='theme-toggle-btn' className='mr-[2rem]'>
                    <ThemeToggle />
                </div>
            </div>
            <p className='text-[#8d8d8d] relative inset-x-[-8.5rem] inset-y-[-3rem] font-medium'>Set your preferred theme for Speechify interface.</p>
        </div>
    </>
);

export default ThemeSetUser;
