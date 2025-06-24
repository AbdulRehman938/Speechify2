import React from 'react';
import { useNavigate } from 'react-router-dom';

const DiscoverApps = () => {
    const navigate = useNavigate();

    const handleDiscoverAppsClick = () => {
        console.log("Discover Speechify Apps clicked!");
    };

    return (
        <div className="bg-white h-[10rem] w-full cursor-pointer px-[1rem] text-black rounded-[1rem] mt-[1rem] border-b-2 border-b-[#e9eaf0] hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-[1.005] active:scale-[0.995]" onClick={handleDiscoverAppsClick}>
            <div className="flex items-center justify-between w-full h-[30%]">
                <span className="font-bold text-[1.2rem]">Discover Speechify Apps</span>
                <img src="src/assets/icons/right-arrow.svg" alt="arrow" className="transition-transform duration-200 group-hover:translate-x-1" />
            </div>
            <p className="font-medium text-[#8b8b8b]">Listen to anything and anywhere, from mobile to desktop</p>
            <div className="w-[25%] flex justify-between h-[2rem] mt-[1rem]">
                <a href="https://apps.apple.com/us/app/speechify-text-to-speech-audio/id1209815023" target="_blank" rel="noopener noreferrer">
                    <img src="src/assets/images/Apple-udash.svg" alt="apple" className="hover:scale-110 active:scale-90 transition-transform duration-150" />
                </a>
                <a href="https://microsoftedge.microsoft.com/addons/detail/speechify-text-to-speech/ljflmlehinmoeknoonhibbjpldiijjmm" target="_blank" rel="noopener noreferrer">
                    <img src="src/assets/images/edge-udash.svg" alt="edge" className="hover:scale-110 active:scale-90 transition-transform duration-150" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.cliffweitzman.speechify2" target="_blank" rel="noopener noreferrer">
                    <img src="src/assets/images/android-udash.svg" alt="android" className="hover:scale-110 active:scale-90 transition-transform duration-150" />
                </a>
                <a href="https://chrome.google.com/webstore/detail/speechify-text-to-speech/ehabbejKggsbmleljjdojGgaaGedlfpk" target="_blank" rel="noopener noreferrer">
                    <img src="src/assets/images/chrome-udash.svg" alt="chrome" className="hover:scale-110 active:scale-90 transition-transform duration-150" />
                </a>
            </div>
        </div>
    );
};

export default DiscoverApps;