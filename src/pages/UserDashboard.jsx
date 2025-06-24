import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import all UI and Modal Components
import GoalsCard from '/src/components/UserDashboard/GoalsCard.jsx';
import StatsCard from '/src/components/UserDashboard/StatsCard';
import DiscoverApps from '/src/components/UserDashboard/DiscoverApps';
import FooterCards from '/src/components/UserDashboard/FooterCards';
import EditSetUser from '/src/components/UserDashboard/EditSetUser';
import FileSetUser from '/src/components/UserDashboard/FileSetUser';
import InstantSetUser from '/src/components/UserDashboard/InstantSetUser';
import ThemeSetUser from '/src/components/UserDashboard/ThemeSetUser';
import LangSetUser from '/src/components/UserDashboard/LangSetUser';

// Import All New Modals
import SubscriptionModal from '/src/components/UserDashboard/SubscriptionModal';
import InviteFriendsModal from '/src/components/UserDashboard/InviteFriendsModal';
import DailyGoalModal from '/src/components/UserDashboard/DailyGoalModal';
import StatisticsModal from '/src/components/UserDashboard/StatisticsModal';
import DiscoverAppsModal from '/src/components/UserDashboard/DiscoverAppsModal';
import ShareThoughtsModal from '/src/components/UserDashboard/ShareThoughtsModal';
import DeletedFilesModal from '/src/components/UserDashboard/DeletedFilesModal';
import FooterCardsModal from '/src/components/UserDashboard/FooterCardsModal';


const DEFAULT_USER_NAME = 'Guest User';
const DEFAULT_USER_EMAIL = 'guest@example.com';
const DEFAULT_USER_PROFILE_PIC = 'src/assets/icons/demo-account.png';
// Updated Sidebar Items
const USER_SIDEBAR_ITEMS = ['Dashboard', 'Subscription', 'Settings', 'Logout'];

const UserDashboard = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [activeModal, setActiveModal] = useState(null); // State to manage active modal
    const navigate = useNavigate();

    const openModal = (modalName) => setActiveModal(modalName);
    const closeModal = () => setActiveModal(null);

    const notifyError = (message) => toast.error(message, { position: 'top-right', autoClose: 2000, theme: 'colored' });
    const notifySuccess = (message) => toast.success(message, { position: 'top-right', autoClose: 2000, theme: 'colored' });

    const loadUserData = () => {
        // This function remains the same as your original code
        try {
            const storedUserData = localStorage.getItem('loggedInUser');
            if (storedUserData) {
                const user = JSON.parse(storedUserData);
                setLoggedInUser({
                    fullName: `${user.firstName || 'User'} ${user.lastName || ''}`.trim(),
                    email: user.email || DEFAULT_USER_EMAIL,
                    profileImageUrl: user.profileImageUrl || DEFAULT_USER_PROFILE_PIC,
                    role: user.role || 'Basic',
                });
            } else {
                setLoggedInUser({
                    fullName: DEFAULT_USER_NAME,
                    email: DEFAULT_USER_EMAIL,
                    profileImageUrl: DEFAULT_USER_PROFILE_PIC,
                    role: 'Basic',
                });
            }
        } catch (error) {
            console.error("Error loading user data:", error);
            notifyError("An error occurred while loading user data.");
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        notifySuccess("You have been logged out.");
        navigate('/login'); // Assuming you have a login route
    };

    const handleMenuClick = (item, idx) => {
        if (item === 'Logout') {
            handleLogout();
        } else if (item === 'Subscription') {
            openModal('subscription');
        } else {
            // For 'Dashboard' and 'Settings', we switch the main view
            setSelectedIndex(USER_SIDEBAR_ITEMS.findIndex(i => i === item));
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-[#f5f5fa] relative overflow-x-hidden py-4">
            <ToastContainer />

            <div className='bg-transparent w-full h-[3rem] flex justify-between items-center px-[2rem]'>
                <div id='navigate-library' className='bg-transparent w-auto h-[2rem] flex items-center cursor-pointer' onClick={() => navigate('/library')}>
                    <img className='h-6 w-6' src="src/assets/icons/left-arrow.svg" alt="left-arrow" />
                    <span>Library</span>
                </div>
                <img src="src/assets/icons/Speechify-logo2.svg" alt="speechify-logo" />
            </div>

            <div className="flex flex-row items-start justify-between w-[55%] mt-[3rem]">
                {/* Sidebar */}
                <div className="flex flex-col items-start w-[20rem]">
                    <img className="rounded-full h-auto w-[7rem]" src={loggedInUser?.profileImageUrl} alt="User Profile" />
                    <h1 className="text-[1.5rem] font-semibold pl-[0.5rem]">{loggedInUser?.fullName}</h1>
                    <p className="text-[1.2rem] font-medium pl-[0.5rem]">{loggedInUser?.role}</p>
                    <ul className="flex flex-col items-start w-full pl-[0.5rem] mt-[1rem] text-[1.2rem] font-medium">
                        {USER_SIDEBAR_ITEMS.map((item, idx) => (
                            <li key={item}
                                className={`mt-[0.5rem] pl-[0.5rem] pr-[1rem] rounded-[0.5rem] py-[0.3rem] cursor-pointer w-full ${selectedIndex === idx && item !== 'Subscription' ? 'bg-white text-black' : 'bg-transparent hover:bg-[#ccccce]'}`}
                                onClick={() => handleMenuClick(item, idx)}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="bg-[#f5f5fa] w-[65%] rounded-[1rem]">
                    {selectedIndex === 0 && ( // Dashboard View
                        <>
                            {/* Upgrade Card */}
                            <div onClick={() => openModal('subscription')} className="w-full h-auto rounded-[1rem] flex flex-row items-center justify-between pl-[2rem] cursor-pointer" style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}>
                                <div className="flex flex-col items-left justify-around w-[25rem] h-full px-[2rem] py-[1.3rem]">
                                    <h1 className="text-white font-bold text-[1.1rem]">Enjoy the most advanced AI voices, unlimited files, and 24/7 support</h1>
                                    <button className="bg-white text-black font-medium w-[60%] py-[0.5rem] px-[0.8rem] rounded-[1rem] mt-4 hover:bg-[#b9e2f5]">Upgrade to Premium</button>
                                </div>
                                <img className="h-auto w-[12rem]" src="src/assets/images/udash-img1.png" alt="user-dashboard" />
                            </div>

                            {/* Referral Banner */}
                            <div onClick={() => openModal('invite')} className="w-full h-auto bg-white flex flex-row justify-between items-center px-[2rem] mt-[1rem] rounded-[1rem] cursor-pointer">
                                <img src="src/assets/images/udash-img2.svg" alt="dashboard" />
                                <div className="ml-[0.5rem]">
                                    <p className="text-[1.1rem] font-bold">Give $60, Get $60</p>
                                    <p className="text-[0.8rem] font-bold w-[14rem]">Invite 2 friends, get 1 year free</p>
                                </div>
                                <div className="ml-[10rem]">
                                    <span className="bg-[#f5f5fa] w-[9rem] text-[0.9rem] font-semibold py-[0.8rem] px-4 rounded-[1rem] hover:bg-[#c9c9c9]">Invite Friends</span>
                                </div>
                            </div>

                            {/* Cards Section */}
                            <div className="flex flex-row w-full mt-[1rem] gap-[1rem]">
                                <div onClick={() => openModal('goals')} className="w-[35%]"><GoalsCard /></div>
                                <div onClick={() => openModal('stats')} className="w-[62%]"><StatsCard /></div>
                            </div>

                            {/* Discover Apps and Footer Cards */}
                            <div onClick={() => openModal('discover')}><DiscoverApps /></div>
                            <FooterCards onShareThoughts={() => openModal('FooterCardsModal')} onDeletedFiles={() => openModal('deleted')} />
                        </>
                    )}

                    {selectedIndex === 2 && ( // Settings View (index 2 because 'Subscription' is 1)
                        <div className="w-full h-[50rem] flex flex-col justify-start items-center bg-white rounded-[1rem] p-4 pl-2">
                            <EditSetUser loggedInUser={loggedInUser} />
                            <FileSetUser />
                            <InstantSetUser />
                            <ThemeSetUser />
                            <LangSetUser />
                            <div className="bg-white h-[5%] w-full text-center mt-4">
                                <p className="font-semibold">To close your account and delete all your data, <span className="hover:underline cursor-pointer text-gray-500">click here</span>.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Render Modals based on activeModal state */}
            {activeModal === 'subscription' && <SubscriptionModal closeModal={closeModal} />}
            {activeModal === 'invite' && <InviteFriendsModal closeModal={closeModal} />}
            {activeModal === 'goals' && <DailyGoalModal closeModal={closeModal} />}
            {activeModal === 'stats' && <StatisticsModal closeModal={closeModal} />}
            {activeModal === 'discover' && <DiscoverAppsModal closeModal={closeModal} />}
            {activeModal === 'thoughts' && <ShareThoughtsModal closeModal={closeModal} />}
            {activeModal === 'deleted' && <DeletedFilesModal closeModal={closeModal} />}
            {activeModal === 'FooterCards' && <FooterCardsModal closeModal={closeModal} />}
        </div>
    );
};

export default UserDashboard;