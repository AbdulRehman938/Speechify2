import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Home/Navbar';
import Curtain from '../components/Home/Curtain';


// Import the new images for speakers
import snoopDoggImage from '/src/assets/images/Snoop-large@2x.webp';
import cliffWeitzmanImage from '/src/assets/images/Cliff-img.png';
import gwynethImage from '/src/assets/images/Gwyneth-img.png';
import mrBeastImage from '/src/assets/images/Beast-img.png';
import emily from '/src/assets/images/Emily-img.png';
import aliAbdaal from '/src/assets/images/Ali_Abdaal-img.png';
import benjamin from '/src/assets/images/Benjamin-img.png';
import pointer from '/src/assets/icons/pointer.svg';

import Special from '../components/Home/Special';
import Toph1 from '../components/Home/toph1';
import Featured from '../components/Home/Featured';
import Listen from '../components/Home/Listen';
import Studio from '../components/Home/Studio';
import Studio2 from '../components/Home/Studio2';

// Speaker data - ALL speakers
const speakerData = [
  { image: emily, name: "Emily", role: "American English" },
  { image: snoopDoggImage, name: "Snoop Dogg", role: "Music icon" },
  { image: cliffWeitzmanImage, name: "Cliff Weitzman", role: "Speechify Founder" },
  { image: gwynethImage, name: "Gwyneth", role: "Actor" },
  { image: mrBeastImage, name: "Mr-Beast", role: "Youtuber" },
  { image: aliAbdaal, name: "Ali Abdaal", role: "Youtuber" },
  { image: benjamin, name: "Benjamin", role: "Narrator" },
  { image: pointer, name: "Sign In", role: "to explore" }
];

// Filtered speaker data for the section outside 'speech-content'
const outsideSpeakerData = speakerData.filter(speaker =>
  ["Snoop Dogg", "Cliff Weitzman", "Gwyneth", "Mr-Beast"].includes(speaker.name)
);

const HomeLayout = () => {

  const toggleSpeech = (index) => {
    if (speakingIndex === index) {
      setSpeakingIndex(null);
    } else {
      setSpeakingIndex(index);
      setIsPlayingMainText(false);
    }
  };

  const toggleMainTextPlayback = () => {
    setIsPlayingMainText(prev => !prev);
    setSpeakingIndex(null);
  };

  const handleLanguageSelect = (languageName) => {
    setSelectedLanguage(languageName);
  };

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

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
