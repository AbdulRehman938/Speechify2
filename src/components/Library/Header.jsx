import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpeechifyLogo from '/src/assets/icons/Speechify-logo2.svg';
import DemoAccount from '/src/assets/icons/demo-account.png';
import DiamondIcon from '/src/assets/images/library-diamod.svg';
import SubscriptionModal from '/src/components/UserDashboard/SubscriptionModal';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const navLinks = [
    { name: 'Dashboard', path: '/user-dashboard' },
   { name: 'Text to Speech', path: '/library' },
    { name: 'AI Voice Cloning', path: '/voice-clone' },
    { name: 'AI Voice Dubbing', path: '/voice-dub' }
  ];

  return (
    <>
      <div className='flex flex-wrap justify-between items-center w-[95%] h-[4rem] px-[2rem] bg-transparent absolute top-0 z-50'>
        <img src={SpeechifyLogo} alt="library-logo" />

        <div className='flex items-center gap-4 relative'>
          {/* Profile image with dropdown */}
          <img
            className='h-auto w-[2rem] rounded-full cursor-pointer'
            src={DemoAccount}
            alt="demo"
            onClick={toggleDropdown}
          />

          {dropdownOpen && (
            <ul
              ref={dropdownRef}
              className='absolute top-[3.5rem] right-0 w-[14rem] bg-white border border-gray-300 rounded-[1rem] shadow-md z-50 py-2'
            >
              {navLinks.map((link) => (
                <li
                  key={link.path}
                  className={`px-4 py-2 cursor-pointer text-[1rem] font-medium rounded-[0.5rem] mx-2 my-1
                    ${location.pathname === link.path
                      ? 'bg-[#ffe4d0] text-[#ff7a21]'
                      : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    navigate(link.path);
                    setDropdownOpen(false);
                  }}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          )}

          {/* Upgrade button */}
          <div
            className='flex items-center gap-2 bg-white px-4 py-2 hover:bg-[#f7d7c2] cursor-pointer rounded-[1rem]'
            onClick={openModal}
          >
            <span className='bg-gradient-to-r from-[#ff7a21] to-[#ff9f5f] bg-clip-text text-transparent text-[1rem] font-semibold'>
              Upgrade
            </span>
            <img src={DiamondIcon} alt="diamond-library" />
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      {showModal && <SubscriptionModal closeModal={closeModal} />}
    </>
  );
};

export default Header;
