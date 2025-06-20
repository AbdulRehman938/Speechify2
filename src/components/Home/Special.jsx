import React, { useState } from 'react';
import { HiCheckBadge } from 'react-icons/hi2';
import { FaApple, FaChrome } from 'react-icons/fa';
import rightBracket from "/src/assets/icons/right-bracket.svg"
import leftBracket from "/src/assets/icons/left-bracket.svg"

import snoopDoggImage from '/src/assets/images/Snoop-large@2x.webp';
import cliffWeitzmanImage from '/src/assets/images/Cliff-img.png';
import gwynethImage from '/src/assets/images/Gwyneth-img.png';
import mrBeastImage from '/src/assets/images/Beast-img.png';

const speakerData = [
    { image: snoopDoggImage, name: "Snoop Dogg", role: "Music icon" },
    { image: cliffWeitzmanImage, name: "Cliff Weitzman", role: "Speechify Founder" },
    { image: gwynethImage, name: "Gwyneth", role: "Actor" },
    { image: mrBeastImage, name: "Mr-Beast", role: "Youtuber" },

];

const Special = () => {

    
    const [ setIsPlayingMainText] = useState(false);

 const toggleSpeech = (index) => {
        if (speakingIndex === index) {
            setSpeakingIndex(null);
        } else {
            setSpeakingIndex(index);
            setIsPlayingMainText(false);
        }
    };
    
    const outsideSpeakerData = speakerData.filter(speaker =>
        ["Snoop Dogg", "Cliff Weitzman", "Gwyneth", "Mr-Beast"].includes(speaker.name)
    );

    const [speakingIndex, setSpeakingIndex] = useState(null); // For speaker play/pause visual state
   

    return (
        <>
            <div className="w-[70%] mx-auto flex flex-col items-center justify-center text-center">
                <h1 className='flex flex-wrap text-[4.5rem] font-normal right-[13rem] relative top-[8rem] bg-transparent w-[72%] leading-none'>
                    #1 Text to Speech Reader. <br />
                    Let Speechify Read To You.
                </h1>
                <button className="group relative bottom-[-15rem] right-[37rem] inline-flex items-center overflow-hidden rounded-[1rem] border-2 border-transparent bg-white px-[2rem] py-[1rem] text-[1.3rem] font-medium text-black hover:bg-black hover:text-white transition-colors duration-300 hover:px-[2rem] transition-all duration-300 ease-in-out">
                    <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-[#2f43fa] opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
                    <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-[-1rem]">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </span>
                    <span className="relative transform duration-700 group-hover:-translate-x-1">
                        Try for Free
                    </span>
                </button>
            </div>
            {/* The existing content below the hero section */}
            <div className='w-[70%] h-[20rem] mt-[15rem] flex justify-between relative bottom-[4rem]'>
                <div className='h-[7rem] mt-[12rem] w-[40%] flex flex-col justify-between items-start align-center px-[1rem]'>
                    <div className='w-[32rem] h-[3rem] flex flex-row justify-between align-center items-center'>
                        <div className=' text-black w-[50%] h-full flex justify-around align-center items-center text-center'>
                            <img src={leftBracket} alt="error" />
                            <div className='flex flex-row gap-[0.5rem]'>
                                <FaApple className='bg-black text-white text-[1.3rem] mt-[0.1rem]' />
                                <p className='font-medium text-[1rem] text-white'> 2025 Apple Design Award</p>
                            </div>
                            <img src={rightBracket} alt="error" />
                        </div>
                        <div className=' text-black w-[45%] h-full flex justify-around align-center items-center text-center'>
                            <img src={leftBracket} alt="error" />
                            <p className='font-medium text-[1rem] text-white'>500k+ 5-star reviews</p>
                            <img src={rightBracket} alt="error" />
                        </div>
                    </div>
                    <div className='w-[32rem] h-[3rem] flex flex-row justify-between align-center items-center'>
                        <div className=' text-black w-[55%] h-full flex justify-around align-center items-center text-center'>
                            <img src={leftBracket} alt="error" />
                            <div className='flex flex-row gap-[0.5rem]'>
                                <FaChrome className='bg-black text-white text-[1.3rem] mt-[0.1rem]' />
                                <p className='font-medium text-[1rem] text-white'>Chrome Extension of The Year</p>
                            </div>
                            <img src={rightBracket} alt="error" />
                        </div>
                        <div className=' text-black w-[30%] h-full flex justify-around align-center items-center text-center mr-[4rem]'>
                            <img src={leftBracket} alt="error" />
                            <p className='font-medium text-[1rem] text-white'>550M+ Users</p>
                            <img src={rightBracket} alt="error" />
                        </div>
                    </div>
                </div>
                <div className='h-full w-[50%] flex flex-col justify-start items-end align-right py-[1rem]'>
                    <div className='flex flex-row w-[18rem] relative top-[2rem] h-[2rem] justify-end items-center gap-2 rounded-[1rem] mr-[1.5rem] animate-slide-up-fade-long'>
                        <HiCheckBadge className='text-[1.5rem]' />
                        <p className='text-gray-200 font-[medium] text-[1.2rem]'>Official Speechify partnership</p>
                    </div>
                    <div className='w-full h-[15rem] mt-[4rem] flex flex-row justify-between align-top items-top gap-3 px-4'>
                        {/* Speakers for outside 'speech-content' div */}
                        {outsideSpeakerData.map((speaker, i) => (
                            <div key={i} className="relative flex flex-col items-center">
                                <div
                                    className={`h-[9rem] w-[9rem] rounded-full overflow-hidden bg-[#242424] hover:bg-blue-700 cursor-pointer animate-fade-in`}
                                >
                                    <img
                                        className="h-full w-full object-cover"
                                        src={speaker.image}
                                        alt={speaker.name}
                                    />
                                </div>
                                <div
                                    className="absolute bottom-[2.5rem] right-0 transform translate-x-1/4 translate-y-1/4 z-20 overflow-hidden rounded-full text-[40px] text-white cursor-pointer"
                                    style={{
                                        background: 'radial-gradient(circle, rgb(26, 26, 27) 60%, transparent 60%)',
                                    }}
                                    onClick={() => toggleSpeech(i)}
                                >
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d={
                                                speakingIndex === i
                                                    ? 'M5.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 .5-.5z'
                                                    : 'M7.05 10.8579L10.95 8.60622C11.4167 8.33679 11.4167 7.66321 10.95 7.39378L7.05 5.14212C6.58333 4.87269 6 5.20947 6 5.74833V10.2517C6 10.7905 6.58333 11.1273 7.05 10.8579Z'
                                            }
                                        />
                                    </svg>
                                </div>
                                <div className="mt-2 text-center text-black">
                                    <p className="font-semibold text-lg text-white">{speaker.name}</p>
                                    <p className="text-sm text-gray-600">{speaker.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Special