import React from 'react';
import SpeechifyLogo from '/src/assets/icons/Speechify-logo2.svg';
import DemoAccount from '/src/assets/icons/demo-account.png';
import DiamondIcon from '/src/assets/images/library-diamod.svg';

const Header = ({ navigate }) => {
  return (
    <div className='flex flex-wrap justify-between items-center w-[95%] h-[4rem] px-[2rem] bg-transparent absolute top-0'>
      <img src={SpeechifyLogo} alt="library-logo" />
      <div className='flex items-center gap-4'>
        <img
          className='h-auto w-[2rem] rounded-full cursor-pointer'
          src={DemoAccount}
          alt="demo"
          onClick={() => navigate('/user-dashboard')}
        />
        <div className='flex items-center gap-2 bg-white px-4 py-2 hover:bg-[#f7d7c2] cursor-pointer rounded-[1rem]'>
          <span className='bg-gradient-to-r from-[#ff7a21] to-[#ff9f5f] bg-clip-text text-transparent text-[1rem] font-semibold'>
            Upgrade
          </span>
          <img src={DiamondIcon} alt="diamond-library" />
        </div>
      </div>
    </div>
  );
};

export default Header;
