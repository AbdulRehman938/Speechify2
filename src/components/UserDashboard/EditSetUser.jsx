import React from 'react';

const EditSetUser = ({ loggedInUser }) => ( // Accept loggedInUser as a prop
    <>
        <div className='bg-white w-full h-[15%] relative pb-[1.3rem] mt-[1.5rem] rounded-[1rem] border-b-2 border-b-[#e9eaf0] flex flex-row items-center justify-between'>
            <div className='flex gap-[1rem]'>
                <img
                    className="rounded-full h-auto w-[4rem] mt-[1.2rem] ml-[1rem]"
                    src={loggedInUser?.profileImageUrl || "src/assets/icons/demo-account.png"} // Use user's image or default
                    alt="User Profile"
                />
                <div className='mt-[1.4rem] h-full w-[13rem] flex flex-col'>
                    <span className='font-semibold text-[1.2rem]'>{loggedInUser?.fullName || 'Your Name'}</span> {/* Use user's full name */}
                    <span className='font-medium text-[#807d7d]'>{loggedInUser?.email || 'your.email@example.com'}</span> {/* Use user's email */}
                </div>
            </div>
            <div className='bg-[#e2e2e2] h-[35%] w-[6.4rem] mt-[0.8rem] ml-[17rem] mr-[1rem] rounded-[1rem] align-center text-center justify-center pt-[0.2rem] cursor-pointer hover:bg-[#807d7d]'>
                <span className='font-semibold'>Edit Profile</span>
            </div>
        </div>
    </>
);

export default EditSetUser;