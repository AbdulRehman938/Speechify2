import React from 'react';

const LangSetUser = () => (
    <>
        <div className='bg-white w-full h-[15%] relative rounded-[1rem] border-b-2 border-b-[#e9eaf0] flex flex-col items-center justify-between top-[1rem]'>
            <div className='bg-white h-[3rem] w-full relative top-[-1rem] flex flex-wrap justify-between items-center'>
                <span className='font-semibold text-[1.3rem] ml-[2rem]'>Language</span>
                <div id='toggle-btn' className='mr-[1rem] bg-gray-200 p-[0.6rem] rounded-[1rem] px-[1rem] mt-[1rem] flex gap-[0.4rem] cursor-pointer hover:bg-gray-300'>
                    <span>English</span>
                    <img src="src\assets\images\down-arrow.svg" alt="down-arrow" />
                </div>
            </div>
            <p className='text-[#8d8d8d] relative inset-x-[-7.2rem] inset-y-[-0.6rem] font-medium'>Automatically launch listening as soon as your file is</p>
            <p className='text-[#8d8d8d] relative inset-x-[-13.5rem] inset-y-[-1rem] font-medium'>imported to your library.</p>
        </div>
    </>
);

export default LangSetUser;
