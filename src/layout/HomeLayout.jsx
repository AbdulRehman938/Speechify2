import React, { useState, useRef } from 'react';
import Navbar from '/src/components/Home/Navbar';
import Curtain from '/src/components/Home/Curtain';

import Special from '/src/components/Home/Special';
import Toph1 from '/src/components/Home/toph1';
import Featured from '/src/components/Home/Featured';
import Listen from '/src/components/Home/Listen';
import Studio from '/src/components/Home/Studio';
import Studio2 from '/src/components/Home/Studio2';




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
        <Special />

        <Toph1 />

        <Featured />

        <Listen />

        <Studio />

        <Studio2 />

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
    </div>
  );
};


export default HomeLayout;
