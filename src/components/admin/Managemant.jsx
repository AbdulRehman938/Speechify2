import React from 'react';

const Management = ({ handleOpenAction }) => {
    return (
        <div className='h-full w-full flex flex-col text-white'>
            <h1 className='text-[2rem] font-bold relative inset-y-[0rem] text-black'>Management</h1>
            {/* View Users */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[5rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('viewUsers', 'View All Users', [
                    { name: 'searchQuery', placeholder: "Search by User ID/Name (Optional)" },
                ])}
            >
                <span className='font-bold text-2xl'>View Users</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can view all the registered users of Speechify
                </p>
            </div>
            {/* Assign Roles */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('assignRoles', 'Assign User Roles', [
                    { name: 'userId', placeholder: "Enter User ID" },
                    { name: 'role', placeholder: "New Role (e.g., admin, user)" },
                ])}
            >
                <span className='font-bold text-2xl'>Assign Roles</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can assign roles to different users of Speechify
                </p>
            </div>
            {/* Delete Users */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('deleteUsers', 'Delete Users', [
                    { name: 'userId', placeholder: "Enter User ID to Delete" },
                ])}
            >
                <span className='font-bold text-2xl'>Delete Users</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can delete any user from Speechify
                </p>
            </div>
        </div>
    );
};

export default Management;