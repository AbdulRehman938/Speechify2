import React, { useState, useRef } from 'react';
import Navbar from '../components/Home/Navbar';
import Curtain from '../components/Home/Curtain';

const HomeLayout = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredLiIndex, setHoveredLiIndex] = useState(null);
  const [showCurtain, setShowCurtain] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (index) => {
    clearTimeout(timeoutRef.current);
    setHoveredIndex(index);
    setFadeKey((prev) => prev + 1);
    setShowCurtain(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowCurtain(false);
      setTimeout(() => {
        setHoveredIndex(null);
        setHoveredLiIndex(null);
      }, 1000);
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000] relative overflow-hidden">
      <Curtain
        showCurtain={showCurtain}
        handleMouseLeave={handleMouseLeave}
        hoveredIndex={hoveredIndex}
        hoveredLiIndex={hoveredLiIndex}
        setHoveredLiIndex={setHoveredLiIndex}
        fadeKey={fadeKey}
      />

      <Navbar handleMouseEnter={handleMouseEnter} />

      <div className="flex-1 flex flex-col items-center justify-center bg-black text-white w-full overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="w-[70%] mx-auto flex flex-col items-center justify-center text-center">
          <h1 className='flex flex-wrap text-[4rem] font-normal absolute top-[6rem] bg-transparent w-[72%] leading-none'>
            FREE TEXT TO SPEECH ONLINE IN SECONDS! NO SIGN-UP REQUIRED.
          </h1>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out forwards;
        }
        @keyframes slideUpFadeLong {
          0% {
            opacity: 0;
            transform: translateY(3rem);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up-fade-long {
          animation: slideUpFadeLong 1s ease-in-out both;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HomeLayout;
