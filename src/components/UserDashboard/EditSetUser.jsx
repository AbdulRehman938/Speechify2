import React, { useState } from 'react';

const EditSetUser = ({ loggedInUser }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleEditClick = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <>
            <div className='bg-white w-full h-[15%] relative pb-[1.3rem] mt-[1.5rem] rounded-[1rem] border-b-2 border-b-[#e9eaf0] flex flex-row items-center justify-between'>
                <div className='flex gap-[1rem]'>
                    <img className="rounded-full h-auto w-[4rem] mt-[1.2rem] ml-[1rem]" src={loggedInUser?.profileImageUrl || "src/assets/icons/demo-account.png"} alt="User Profile" />
                    <div className='mt-[1.4rem] h-full w-[13rem] flex flex-col'>
                        <span className='font-semibold text-[1.2rem]'>{loggedInUser?.fullName || 'Your Name'}</span>
                        <span className='font-medium text-[#807d7d]'>{loggedInUser?.email || 'your.email@example.com'}</span>
                    </div>
                </div>
                <div className='bg-[#e2e2e2] h-[2rem] w-[8rem] mt-[0.8rem] ml-[17rem] mr-[1rem] rounded-[1rem] text-center pt-[0.2rem] cursor-pointer hover:bg-[#807d7d]' onClick={handleEditClick}>
                    <span className='font-semibold'>Edit Profile</span>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                        {/* Add form fields for editing user info here */}
                        <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-gray-300 rounded">Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditSetUser;