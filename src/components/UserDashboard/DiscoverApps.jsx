import React from 'react';

const DiscoverApps = () => (
  <div className="bg-white h-[20%] w-full cursor-pointer px-[1rem] text-black rounded-[1rem] mt-[1rem] border-b-2 border-b-[#e9eaf0]">
    <div className="flex items-center justify-between w-full h-[30%]">
      <span className="font-bold text-[1.2rem]">Discover Speechify Apps</span>
      <img src="src/assets/icons/right-arrow.svg" alt="arrow" />
    </div>
    <p className="font-medium text-[#8b8b8b]">Listen to anything and anywhere, from mobile to desktop</p>
    <div className="w-[25%] flex justify-between h-[2rem] mt-[1rem]">
      <img src="src/assets/images/Apple-udash.svg" alt="apple" />
      <img src="src/assets/images/edge-udash.svg" alt="edge" />
      <img src="src/assets/images/android-udash.svg" alt="android" />
      <img src="src/assets/images/chrome-udash.svg" alt="chrome" />
    </div>
  </div>
);

export default DiscoverApps;
