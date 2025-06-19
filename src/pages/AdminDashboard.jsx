import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import UserAPI along with other APIs
import { DatasetAPI, LanguageAPI, ModelAPI, UserAPI } from '/src/libs/api/apiEndPoints';

// Import constants
import { ADMIN_NAME, ADMIN_FULL_NAME, SIDEBAR_ITEMS } from '../constants/adminConstants';
import SpeechifyModels from '../components/admin/SpeechifyModels';
import ModelLanguages from '../components/admin/ModelLanguages';
import ModelDatasets from '../components/admin/ModelDatasets';
import Management from '../components/admin/Managemant';


const AdminDashboard = () => {
    const admin = ADMIN_NAME;
    const adminFull = ADMIN_FULL_NAME;

    const sidebarItems = SIDEBAR_ITEMS;

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activeAction, setActiveAction] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);

    // Helper function for error toasts
    const notifyError = (message) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 3000,
            theme: 'colored',
        });
    };

    // Helper function for success toasts
    const notifySuccess = (message) => {
        toast.success(message, {
            position: 'top-right',
            autoClose: 2000,
            theme: 'colored',
        });
    };

    // Function to load user data from localStorage
    const loadUserData = () => {
        try {
            const storedUserData = localStorage.getItem('loggedInUser');
            let user = {};
            const missingFields = [];

            if (storedUserData) {
                user = JSON.parse(storedUserData);

                // Validate essential fields
                if (!user.firstName) missingFields.push('First Name');
                if (!user.lastName) missingFields.push('Last Name');
                if (!user.email) missingFields.push('Email');

                if (missingFields.length > 0) {
                    notifyError(`Some profile data is missing: ${missingFields.join(', ')}. Using default values.`);
                }
            } else {
                notifyError("No stored user data found. Displaying default admin profile.");
            }

            // Construct user object with fallbacks
            const firstName = user.firstName || admin;
            const lastName = user.lastName || '';
            const fullName = (firstName + ' ' + lastName).trim() || adminFull;
            const username = user.username || 'admin_user';
            const email = user.email || 'admin@example.com';
            const profileImageUrl = user.profileImageUrl || null;

            setLoggedInUser({
                firstName,
                lastName,
                fullName,
                username,
                email,
                profileImageUrl,
            });

        } catch (error) {
            console.error("Error loading or parsing user data from storage:", error);
            notifyError("An error occurred while loading user data from storage. Displaying default admin profile.");
            setLoggedInUser({
                firstName: admin,
                lastName: "",
                fullName: adminFull,
                username: "Admin",
                email: "",
                profileImageUrl: null,
            });
        }
    };

    // Call loadUserData once on component mount
    useEffect(() => {
        loadUserData();
    }, []);

    // Dynamic Action Modal Component for API interactions
    const ActionModal = ({ action, onClose }) => {
        const [currentInputValues, setCurrentInputValues] = useState({});

        // Initialize input values when action changes
        useEffect(() => {
            const initialValues = {};
            if (action && action.inputs) {
                action.inputs.forEach(input => {
                    initialValues[input.name] = '';
                });
            }
            setCurrentInputValues(initialValues);
        }, [action]);

        if (!action) return null;

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setCurrentInputValues(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = async () => {
            const missingRequiredFields = [];
            action.inputs.forEach(input => {
                if (input.required && !currentInputValues[input.name] && !input.name.includes('searchQuery')) {
                    missingRequiredFields.push(input.placeholder || input.name);
                }
            });

            if (missingRequiredFields.length > 0) {
                notifyError(`Please fill all required fields: ${missingRequiredFields.join(', ')}.`);
                return;
            }

            try {
                let response;
                let payload = {};

                switch (action.type) {
                    case 'addModel':
                        payload = {
                            modelType: currentInputValues.modelType,
                            modelName: currentInputValues.modelName,
                            displayName: currentInputValues.displayName,
                        };
                        response = await ModelAPI.addModel(payload);
                        break;
                    case 'getAllModels':
                        response = await ModelAPI.getAllModels();
                        console.log("All Models Data:", response.data);
                        break;
                    case 'getModel':
                        response = await ModelAPI.getModel(currentInputValues.modelName);
                        console.log("Specific Model Data:", response.data);
                        break;
                    case 'deleteModel':
                        response = await ModelAPI.deleteModel(currentInputValues.modelName);
                        break;
                    case 'updateModel':
                        payload = {
                            name: currentInputValues.modelName,
                            newModelName: currentInputValues.newModelName,
                            newDisplayName: currentInputValues.newDisplayName,
                        };
                        response = await ModelAPI.updateModel(payload);
                        break;

                    case 'addLanguage':
                        payload = { languageName: currentInputValues.languageName };
                        response = await LanguageAPI.addLanguage(payload);
                        break;
                    case 'getAllLanguages':
                        response = await LanguageAPI.getAllLanguages();
                        console.log("All Languages Data:", response.data);
                        break;
                    case 'getLanguageByName':
                        response = await LanguageAPI.getLanguageByName(currentInputValues.languageName);
                        console.log("Specific Language Data:", response.data);
                        break;
                    case 'deleteLanguage':
                        response = await LanguageAPI.deleteLanguage(currentInputValues.languageName);
                        break;
                    case 'updateLanguage':
                        payload = {
                            name: currentInputValues.languageName,
                            newName: currentInputValues.newLanguageName
                        };
                        response = await LanguageAPI.updateLanguage(payload);
                        break;

                    case 'addDataset':
                        payload = { datasetName: currentInputValues.datasetName };
                        response = await DatasetAPI.addDataset(payload);
                        break;
                    case 'viewDatasets':
                        response = await DatasetAPI.viewDatasets();
                        console.log("All Datasets Data:", response.data);
                        break;
                    case 'viewDatasetByName':
                        response = await DatasetAPI.viewDatasetByName(currentInputValues.datasetName);
                        console.log("Specific Dataset Data:", response.data);
                        break;
                    case 'deleteDataset':
                        response = await DatasetAPI.deleteDataset(currentInputValues.datasetName);
                        break;
                    case 'updateDataset':
                        payload = { newDatasetName: currentInputValues.newDatasetName };
                        response = await DatasetAPI.updateDataset(currentInputValues.datasetName, payload);
                        break;

                    // --- USER MANAGEMENT ENDPOINTS ---
                    case 'viewUsers':
                        // Based on apiEndPoints.js, this is 'users/profile'.
                        // If you intend to view *all* users, your apiEndPoints.js
                        // will need a new UserAPI method (e.g., `getAllUsers: async () => await getRequest('users')`).
                        // The current endpoint likely returns the logged-in user's profile.
                        response = await UserAPI.viewUsers();
                        if (currentInputValues.searchQuery) {
                            console.warn("Search query is present but UserAPI.viewUsers (users/profile) does not support search parameters directly based on current apiEndPoints.js.");
                            notifyError("Search query is not supported by current 'View Users' API.");
                        }
                        console.log("View Users (users/profile) Data:", response.data);
                        notifySuccess("Successfully fetched user profile.");
                        // You might want to display this data in a different way or open a new modal/section
                        onClose(); // Close modal after fetching
                        return; // Exit here as we don't need a default success toast after custom handling

                    case 'assignRoles':
                        // Placeholder: Your apiEndPoints.js does NOT currently define UserAPI.assignRoles.
                        // You will need to add a method like:
                        // assignRoles: async (userId, role) => await patchRequest(`users/${userId}/role`, { role }),
                        // or similar based on your Swagger.
                        notifyError("UserAPI.assignRoles is not defined in apiEndPoints.js. Please implement it.");
                        console.error("Attempted to call UserAPI.assignRoles which is undefined.");
                        return;

                    case 'deleteUsers':
                        // Placeholder: Your apiEndPoints.js does NOT currently define UserAPI.deleteUsers.
                        // You will need to add a method like:
                        // deleteUser: async (userId) => await deleteRequest(`users/${userId}`),
                        // or similar based on your Swagger.
                        notifyError("UserAPI.deleteUsers is not defined in apiEndPoints.js. Please implement it.");
                        console.error("Attempted to call UserAPI.deleteUsers which is undefined.");
                        return;

                    default:
                        notifyError("Unknown action type for API call.");
                        return;
                }

                notifySuccess(response?.message || `${action.title} successful!`);
                onClose();
            } catch (error) {
                notifyError(
                    error?.response?.data?.message ||
                    error?.message ||
                    `${action.title} failed.`
                );
            }
        };

        const handleOutsideClick = (e) => {
            if (e.target.id === "modal-overlay") {
                onClose();
            }
        };

        return (
            <div
                id="modal-overlay"
                className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-60"
                onClick={handleOutsideClick}
            >
                <div
                    className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center w-[22rem]"
                    onClick={e => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold text-black mb-4">{action.title}</h2>
                    {action.inputs.map((input, index) => (
                        <input
                            key={input.name || index}
                            type="text"
                            name={input.name}
                            placeholder={input.placeholder}
                            value={currentInputValues[input.name] || ''}
                            onChange={handleInputChange}
                            className="mb-3 w-full p-2 rounded bg-gray-200 text-black font-semibold outline-none placeholder-gray-500"
                        />
                    ))}
                    <button
                        onClick={handleSubmit}
                        className="mt-4 bg-blue-700 text-white font-bold p-2 rounded-[1rem] hover:bg-blue-800 w-full"
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    };

    const handleOpenAction = (actionType, title, inputs) => {
        setActiveAction({ type: actionType, title, inputs });
    };

    const handleCloseAction = () => {
        setActiveAction(null);
    };

    // Render nothing if loggedInUser is null during initial load
    if (loggedInUser === null) {
        return <div className="flex justify-center items-center h-screen w-full text-black">Loading user data...</div>;
    }

    // Function to get initials for profile image fallback
    const getInitials = () => {
        const firstInitial = loggedInUser?.firstName?.charAt(0).toUpperCase() || '';
        const lastInitial = loggedInUser?.lastName?.charAt(0).toUpperCase() || '';
        return (firstInitial + lastInitial).trim() || 'AU';
    };

    return (
        <div className='bg-white flex flex-col w-full h-full'>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            {/* Top Navbar */}
            <div className='bg-white flex justify-between w-full h-[4rem] px-[3rem] py-[1rem] items-center'>
                <img className='h-[2rem] w-[8rem]' src="src/assets/icons/Speechify-logo2.svg" alt="Speechify-logo" />
                <span className='text-5xl font-bold relative inset-x-[18rem] text-[#0453fc]'>Welcome {loggedInUser?.firstName || admin}</span>
                <div className='h-full w-[8rem] flex justify-around border-r-[0.2rem] border-r-[#9b9898] relative inset-x-[21rem]'>
                    <img className='cursor-pointer hover:scale-75' src="src/assets/images/envelope.png" alt="msg" />
                    <img className='cursor-pointer hover:scale-75' src="src/assets/images/bell.png" alt="bell" />
                </div>
                <div className='w-[13rem] h-[2rem] bg-white flex items-center gap-2 pl-[1rem]'>
                    <span className='text-[1rem] font-bold'>{loggedInUser?.fullName}</span>
                    {loggedInUser?.profileImageUrl ? (
                        <img className='rounded-full h-12 w-12 object-cover' src={loggedInUser.profileImageUrl} alt="User Profile" />
                    ) : (
                        <div className='rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center text-black font-bold text-sm'>
                            {getInitials()}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Section */}
            <div className='flex flex-row w-full h-full mt-[2rem]'>
                {/* Sidebar */}
                <div className="flex flex-col items-start justify-start bg-[#f5f5fa] h-[30rem] w-[20rem] ml-[3rem] p-[1rem] rounded-[1rem]">
                    {loggedInUser?.profileImageUrl ? (
                        <img className="rounded-full h-auto w-[7rem] object-cover" src={loggedInUser.profileImageUrl} alt="User Profile" />
                    ) : (
                        <div className='rounded-full h-[7rem] w-[7rem] bg-gray-300 flex items-center justify-center text-black font-bold text-3xl'>
                            {getInitials()}
                        </div>
                    )}
                    <h1 className="text-[1.5rem] font-semibold mt-2">{loggedInUser?.fullName}</h1>
                    <p className="text-[1.2rem] font-medium">{loggedInUser?.username}</p>

                    {/* Sidebar List Items */}
                    <ul className="flex flex-col items-start justify-start w-full mt-[2rem] text-[1.2rem] font-medium">
                        {sidebarItems.map((item, idx) => (
                            <li
                                key={item}
                                className={`w-full px-4 py-2 rounded-[0.5rem] cursor-pointer ${selectedIndex === idx ? 'bg-white text-black' : 'hover:bg-[#ccccce]'}`}
                                onClick={() => setSelectedIndex(idx)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content Area - Render based on selectedIndex */}
                <div className='bg-gray-100 w-[70%] h-[50rem] ml-[3rem] rounded-[2rem] p-[2rem] text-black flex flex-col justify-center align-center text-center'>
                    {selectedIndex === 0 && <SpeechifyModels handleOpenAction={handleOpenAction} />}
                    {selectedIndex === 1 && <ModelLanguages handleOpenAction={handleOpenAction} />}
                    {selectedIndex === 2 && <ModelDatasets handleOpenAction={handleOpenAction} />}
                    {/* Management component will trigger handleOpenAction for user management */}
                    {selectedIndex === 3 && <Management handleOpenAction={handleOpenAction} />}
                </div>
            </div>

            {/* Action Modal */}
            {activeAction && (
                <ActionModal
                    action={activeAction}
                    onClose={handleCloseAction}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
