import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

// Assuming these constants exist. Create them if they don't,
// for example, in `src/constants/userConstants.js`
const DEFAULT_USER_NAME = 'Guest User';
const DEFAULT_USER_EMAIL = 'guest@example.com';
const DEFAULT_USER_PROFILE_PIC = 'src/assets/icons/demo-account.png';
const USER_SIDEBAR_ITEMS = [ // Example items, adjust as per your actual menuItems
    'Dashboard',
    'My Library',
    'Settings',
    'Help',
    'Logout',
];


import GoalsCard from '/components/UserDashboard/GoalsCard';
import StatsCard from '/components/UserDashboard/StatsCard';
import DiscoverApps from '/components/UserDashboard/DiscoverApps';
import FooterCards from '/components/UserDashboard/FooterCards';
import EditSetUser from '/components/UserDashboard/EditSetUser';
import FileSetUser from '/components/UserDashboard/FileSetUser';
import InstantSetUser from '/components/UserDashboard/InstantSetUser';
import ThemeSetUser from '/components/UserDashboard/ThemeSetUser';
import LangSetUser from '/components/UserDashboard/LangSetUser';

const UserDashboard = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loggedInUser, setLoggedInUser] = useState(null); // State to store user data
    const navigate = useNavigate();

    // Re-using menuItems or defining them here if they are not passed
    // If you have a separate `menuItems` for User Dashboard, import it.
    // Otherwise, define it locally or use a constant like USER_SIDEBAR_ITEMS.
    const menuItems = USER_SIDEBAR_ITEMS; // Assuming menuItems are provided in your actual setup

    // Notification functions
    const notifyError = (message) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 2000,
            theme: 'colored'
        });
    };

    const notifySuccess = (message) => {
        toast.success(message, {
            position: 'top-right',
            autoClose: 2000,
            theme: 'colored'
        });
    };

    // Function to load user data from localStorage
    const loadUserData = () => {
        try {
            const storedUserData = localStorage.getItem('loggedInUser'); // Key used to store user data

            if (storedUserData) {
                const user = JSON.parse(storedUserData);
                setLoggedInUser({
                    firstName: user.firstName || 'User',
                    lastName: user.lastName || '',
                    fullName: `${user.firstName || 'User'} ${user.lastName || ''}`.trim(),
                    username: user.username || 'user',
                    email: user.email || DEFAULT_USER_EMAIL,
                    profileImageUrl: user.profileImageUrl || DEFAULT_USER_PROFILE_PIC,
                    // Add other user-specific data like 'role' if needed
                    role: user.role || 'Basic' // Assuming 'Basic' is the default user role
                });
                notifySuccess("User data loaded successfully!");
            } else {
                // Fallback to default values if no user data is found
                setLoggedInUser({
                    firstName: 'Guest',
                    lastName: '',
                    fullName: DEFAULT_USER_NAME,
                    username: 'guest',
                    email: DEFAULT_USER_EMAIL,
                    profileImageUrl: DEFAULT_USER_PROFILE_PIC,
                    role: 'Basic'
                });
                notifyError("No stored user data found. Displaying default user profile.");
            }
        } catch (error) {
            console.error("Error loading user data:", error);
            notifyError("An error occurred while loading user data.");
            // Ensure loggedInUser is set to a default even on error
            setLoggedInUser({
                firstName: 'Error',
                lastName: '',
                fullName: DEFAULT_USER_NAME,
                username: 'error_user',
                email: DEFAULT_USER_EMAIL,
                profileImageUrl: DEFAULT_USER_PROFILE_PIC,
                role: 'Basic'
            });
        }
    };

    // Load user data when the component mounts
    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#f5f5fa] relative overflow-x-hidden">
            <ToastContainer /> {/* Add ToastContainer for notifications */}

            <div className='bg-transparent w-full h-[3rem] flex justify-between items-center align-center px-[2rem]'>
                <div
                    id='navigate-library'
                    className='bg-transparent w-[6rem] h-[2rem] flex'
                    onClick={() => navigate('/library')}
                    style={{ cursor: 'pointer' }}
                >
                    <img className='h-6 w-6' src="src\assets\icons\left-arrow.svg" alt="left-arrow" />
                    <span>Library</span>
                </div>
                <img src="src\assets\icons\Speechify-logo2.svg" alt="speechify-logo" />
            </div>
            <div className="flex flex-row items-start justify-between w-[55%] h-[55rem] bg-[#f5f5fa] mt-[3rem]">
                {/* Sidebar */}
                <div className="flex flex-col items-start justify-start bg-[#f5f5fa] h-[25rem] w-[20rem]">
                    <img
                        className="rounded-full h-auto w-[7rem]"
                        src={loggedInUser?.profileImageUrl || DEFAULT_USER_PROFILE_PIC} // Use user's image or default
                        alt="User Profile"
                    />
                    <h1 className="text-[1.5rem] font-semibold pl-[0.5rem]">{loggedInUser?.fullName || 'Your Name'}</h1> {/* Use user's full name */}
                    <p className="text-[1.2rem] font-medium pl-[0.5rem]">{loggedInUser?.role || 'Basic'}</p> {/* Use user's role */}
                    <ul className="flex flex-col items-start justify-start pl-[0.5rem] mt-[1rem] text-[1.2rem] font-medium w-full">
                        {menuItems.map((item, idx) => (
                            <li
                                key={item}
                                className={`mt-[0.5rem] pl-[0.5rem] pr-[10rem] rounded-[0.5rem] py-[0.3rem] cursor-pointer w-full ${
                                    selectedIndex === idx ? 'bg-white text-black' : 'bg-transparent hover:bg-[#ccccce]'
                                }`}
                                onClick={() => setSelectedIndex(idx)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="bg-[#f5f5fa] w-[65%] h-full rounded-[1rem]">
                    {selectedIndex === 0 && (
                        <>
                            {/* Upgrade Card */}
                            <div
                                className="w-full h-[20%] rounded-[1rem] flex flex-row items-center justify-between pl-[2rem]"
                                style={{
                                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)',
                                }}
                            >
                                <div className="flex flex-col items-left justify-around w-[25rem] h-full px-[2rem] gap-[0rem] py-[1.3rem]">
                                    <h1 className="text-white font-bold text-[1.1rem]">
                                        Enjoy the most advanced AI voices, unlimited files, and 24/7 support
                                    </h1>
                                    <button className="bg-white text-black font-medium w-[60%] py-[0.5rem] px-[0.8rem] rounded-[1rem] hover:bg-[#b9e2f5]">
                                        Upgrade to Premium
                                    </button>
                                </div>
                                <img className="h-auto w-[12rem]" src="src/assets/images/udash-img1.png" alt="user-dashboard" />
                            </div>

                            {/* Referral Banner */}
                            <div className="w-full h-[10%] bg-white flex flex-row justify-between items-center px-[2rem] mt-[1rem] rounded-[1rem]">
                                <img src="src/assets/images/udash-img2.svg" alt="dashboard" />
                                <div className="ml-[0.5rem]">
                                    <p className="text-[1.1rem] font-bold">Give $60, Get $60</p>
                                    <p className="text-[0.8rem] font-bold w-[14rem]">Invite 2 friends, get 1 year free</p>
                                </div>
                                <div className="ml-[10rem] flex items-center justify-center text-center cursor-pointer rounded-[1rem]">
                                    <span className="bg-[#f5f5fa] w-[9rem] text-[0.9rem] font-semibold py-[0.8rem] rounded-[1rem] hover:bg-[#c9c9c9]">
                                        Invite Friends
                                    </span>
                                </div>
                            </div>

                            {/* Cards Section */}
                            <div className="flex flex-row flex-wrap w-full h-[15%] mt-[1rem] rounded-[1rem] gap-[1rem]">
                                <GoalsCard />
                                <StatsCard />
                            </div>

                            {/* Discover Apps */}
                            <DiscoverApps />

                            {/* Footer Cards */}
                            <FooterCards />
                        </>
                    )}

                    {selectedIndex === 2 && (
                        <div className="w-full h-[80%] flex flex-col items-center justify-between bg-white rounded-[1rem]">
                            <EditSetUser loggedInUser={loggedInUser} /> {/* Pass loggedInUser as prop */}
                            <FileSetUser />
                            <InstantSetUser />
                            <ThemeSetUser />
                            <LangSetUser />
                            <div className="bg-white h-[5%] w-full justify-center align-center text-center">
                                <p className="font-semibold">
                                    To close your account and delete all your data permanently,{' '}
                                    <span className="hover:text-underline cursor-pointer hover: text-gray-500">click here</span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;