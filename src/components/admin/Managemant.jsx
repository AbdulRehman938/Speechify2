import React, { useState } from 'react';

const Management = ({ handleOpenAction }) => {
    const [apiResults, setApiResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentAction, setCurrentAction] = useState('');

    const handleApiCall = async (actionType, inputValues) => {
        setLoading(true);
        setCurrentAction(actionType);
        
        try {
            let response;
            
            switch (actionType) {
                case 'viewUsers':
                    response = await UserAPI.getAllUsers();
                    setApiResults(response.data);
                    break;
                    
                case 'assignRoles':
                    // Note: You'll need to implement UserAPI.assignRoles in your apiEndpoints
                    response = await UserAPI.assignRole(
                        inputValues.userId, 
                        inputValues.role
                    );
                    setApiResults({
                        message: response.message,
                        userId: inputValues.userId,
                        newRole: inputValues.role
                    });
                    break;
                    
                case 'deleteUsers':
                    // Note: You'll need to implement UserAPI.deleteUsers in your apiEndpoints
                    response = await UserAPI.deleteUser(inputValues.userId);
                    setApiResults({
                        message: response.message,
                        deletedUserId: inputValues.userId
                    });
                    break;
                    
                default:
                    setApiResults({ error: 'Unknown action type' });
            }
        } catch (error) {
            setApiResults({ 
                error: error.response?.data?.message || error.message || 'API call failed'
            });
        } finally {
            setLoading(false);
        }
    };

    const renderResults = () => {
        if (loading) {
            return (
                <div className="w-[90%] mt-4 ml-[4rem] p-4 bg-gray-100 rounded-lg">
                    <p className="text-black">Loading...</p>
                </div>
            );
        }

        if (!apiResults) return null;

        if (apiResults.error) {
            return (
                <div className="w-[90%] mt-4 ml-[4rem] p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <p>Error: {apiResults.error}</p>
                </div>
            );
        }

        switch (currentAction) {
            case 'viewUsers':
                return (
                    <div className="w-[90%] mt-4 ml-[4rem] p-4 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-black mb-4">Users List</h3>
                        {Array.isArray(apiResults) ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr className="bg-gray-200 text-black">
                                            <th className="py-2 px-4 border">ID</th>
                                            <th className="py-2 px-4 border">Name</th>
                                            <th className="py-2 px-4 border">Email</th>
                                            <th className="py-2 px-4 border">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {apiResults.map(user => (
                                            <tr key={user.id} className="border">
                                                <td className="py-2 px-4 border text-black">{user.id}</td>
                                                <td className="py-2 px-4 border text-black">
                                                    {user.firstName} {user.lastName}
                                                </td>
                                                <td className="py-2 px-4 border text-black">{user.email}</td>
                                                <td className="py-2 px-4 border text-black">{user.role}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-black">
                                <pre>{JSON.stringify(apiResults, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                );
                
            case 'assignRoles':
                return (
                    <div className="w-[90%] mt-4 ml-[4rem] p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">Role Assignment Result</h3>
                        <p>User ID: {apiResults.userId}</p>
                        <p>New Role: {apiResults.newRole}</p>
                        <p className="mt-2">{apiResults.message}</p>
                    </div>
                );
                
            case 'deleteUsers':
                return (
                    <div className="w-[90%] mt-4 ml-[4rem] p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">User Deletion Result</h3>
                        <p>Deleted User ID: {apiResults.deletedUserId}</p>
                        <p className="mt-2">{apiResults.message}</p>
                    </div>
                );
                
            default:
                return (
                    <div className="w-[90%] mt-4 ml-[4rem] p-4 bg-white rounded-lg">
                        <pre className="text-black">{JSON.stringify(apiResults, null, 2)}</pre>
                    </div>
                );
        }
    };

    return (
        <div className='h-full w-full flex flex-col text-white'>
            <h1 className='text-[2rem] font-bold relative inset-y-[0rem] text-black'>Management</h1>
            
            {/* View Users */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[5rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)'
                }}
                onClick={() => handleOpenAction(
                    'viewUsers', 
                    'View All Users', 
                    [
                        { name: 'searchQuery', placeholder: "Search by User ID/Name (Optional)" },
                    ],
                    handleApiCall
                )}
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
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)'
                }}
                onClick={() => handleOpenAction(
                    'assignRoles', 
                    'Assign User Roles', 
                    [
                        { name: 'userId', placeholder: "Enter User ID" },
                        { name: 'role', placeholder: "New Role (e.g., admin, user)" },
                    ],
                    handleApiCall
                )}
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
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)'
                }}
                onClick={() => handleOpenAction(
                    'deleteUsers', 
                    'Delete Users', 
                    [
                        { name: 'userId', placeholder: "Enter User ID to Delete" },
                    ],
                    handleApiCall
                )}
            >
                <span className='font-bold text-2xl'>Delete Users</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can delete any user from Speechify
                </p>
            </div>
            
            {/* Results Container */}
            {renderResults()}
        </div>
    );
};

export default Management;  