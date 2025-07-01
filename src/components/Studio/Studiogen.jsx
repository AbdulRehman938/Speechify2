import React from 'react';
import henry from "/src/assets/images/Henry-img.png";
import { GiFilmProjector } from 'react-icons/gi';
import { IoBookOutline, IoLogoTiktok } from 'react-icons/io5';
import DemoAudioPlayer from '../DemoAudioPlayer';
import kristy from "/src/assets/images/Cristy-img.png"
import { TbWorld } from "react-icons/tb";
import { PiVideoLight } from "react-icons/pi";
import carly from "/src/assets/images/Carly-img.png"
import { LuFileAudio, LuPenLine } from "react-icons/lu";
import russel from "/src/assets/images/Russel-img.png"
import { ImFilm } from "react-icons/im";


const Studiogen = () => {
    return (
        <>
            {/* Add clipPath definition */}
            <svg width="0" height="0">
                <clipPath id="sound-clip-playing-Henry">
                    <rect width="100%" height="100%" rx="12" />
                </clipPath>
            </svg>

            <div className='w-full h-[80rem] bg-black relative top-[12rem] flex flex-col justify-start items-center align-center'>
                <h1 className='text-white font-medium text-[4rem]'>How to Create the Perfect AI Voice Over</h1>
                <p className='text-white font-normal text-[2rem] w-[60rem] mt-[2rem]'>Master the art of creating the perfect AI voice over with Speechify Studio.</p>
            </div>
            <div className='bg-black w-[75%] h-[5rem] relative top-[-50rem] flex flex-col justify-start items-start laign-start'>
                <h1 className='font-normal text-[6rem] text-white relative'>1,000+ Lifelike AI Voices</h1>
                <div className='w-full h-[50rem] bg-black flex flex-row justify-center align-center border-t-[0.1rem] border-t-gray-300'>
                    <div className='h-full bg-black w-[40%] flex flex-col justify-start align-start-items-start'>
                        <p className='font-normal mt-[1rem] text-[2rem] text-white text-left'>
                            Speechify AI Voice Generator provides over 1,000 AI voices in more than 60 languages, complete with regional dialects and accents. This versatility allows for culturally nuanced voices, perfectly suited for reaching diverse global audiences.
                        </p>
                        <button className="group relative inline-flex items-center overflow-hidden rounded-[1rem] w-[30%] mt-[2rem] border-2 border-transparent bg-white px-[2.5rem] py-[1rem] text-[1rem] font-medium text-black hover:bg-black hover:text-white transition-colors duration-300 hover:px-[2rem] transition-all duration-300 ease-in-out">
                            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-[#2f43fa] opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
                            <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-[-1rem]">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </span>
                            <span className="relative transform duration-700 group-hover:-translate-x-1">Try for Free</span>
                        </button>
                    </div>

                    <div id='speech' className='h-full bg-black w-[60%] flex flex-col justify-between align-center items-center mt-[1rem]'>
                        <div className='w-full gap-[1rem] h-[49%] flex flex-row justify-between'>
                            <div className='bg-[#161616] w-[90%] h-full flex flex-col justify-start align-center gap-[1rem] items-center text-center pt-[1rem] rounded-[2rem]'>
                                <img className='rounded-full object-cover w-[8rem] h-[8rem]' src={henry} alt="error" />
                                <p className='text-white font-medium text-[1.4rem]'>Henry</p>

                                <div className='flex flex-row justify-center gap-[.5rem] w-full'>
                                    <div className='bg-[#2d2d2d] w-[7rem] h-[3rem] rounded-[2rem] flex flex-row justify-center gap-[0.5rem] items-center align-center'>
                                        <GiFilmProjector className='text-[1.5rem]' />
                                        <span className='text-[1.4rem] font-medium'>Ads</span>
                                    </div>
                                    <div className='bg-[#2d2d2d] w-[10rem] h-[3rem] rounded-[2rem] flex flex-row justify-center text-center align-center gap-[0.5rem] items-center'>
                                        <IoBookOutline className='text-[1.5rem]' />
                                        <span className='text-[1.2rem] font-medium'>E-Learning</span>
                                    </div>
                                </div>
                                <DemoAudioPlayer />
                            </div>

                            <div className='bg-[#161616] w-[90%] h-full flex flex-col justify-start align-center gap-[1rem] items-center text-center pt-[1rem] rounded-[2rem]'>
                                <img className='rounded-full object-cover w-[8rem] h-[8rem]' src={kristy} alt="error" />
                                <p className='text-white font-medium text-[1.4rem]'>Kristy</p>

                                <div className='flex flex-row justify-center gap-[.5rem] w-full'>
                                    <div className='bg-[#2d2d2d] w-[9rem] h-[3rem] rounded-[2rem] flex flex-row justify-center gap-[0.5rem] items-center align-center'>
                                        <TbWorld className='text-[1.5rem]' />
                                        <span className='text-[1.2rem] font-medium'>Website</span>
                                    </div>
                                    <div className='bg-[#2d2d2d] w-[9rem] h-[3rem] rounded-[2rem] flex flex-row justify-center text-center align-center gap-[0.5rem] items-center'>
                                        <PiVideoLight className='text-[1.5rem]' />
                                        <span className='text-[1.2rem] font-medium'>Youtube</span>
                                    </div>
                                </div>
                                <DemoAudioPlayer />
                            </div>
                        </div>

                        <div className='w-full h-[49%] gap-[1rem] flex flex-row justify-between'>
                            <div className='bg-[#161616] w-[49%] h-full flex flex-col justify-start align-center gap-[1rem] items-center text-center pt-[1rem] rounded-[2rem]'>
                                <img className='rounded-full object-cover w-[8rem] h-[8rem]' src={carly} alt="error" />
                                <p className='text-white font-medium text-[1.4rem]'>Carly</p>

                                <div className='flex flex-row justify-center gap-[.5rem] w-full'>
                                    <div className='bg-[#2d2d2d] w-[7rem] h-[3rem] rounded-[2rem] flex flex-row justify-center gap-[0.5rem] items-center align-center'>
                                        <IoLogoTiktok className='text-[1.5rem]' />
                                        <span className='text-[1rem] font-medium'>TikTok</span>
                                    </div>
                                    <div className='bg-[#2d2d2d] w-[8rem] h-[3rem] rounded-[2rem] flex flex-row justify-center text-center align-center gap-[0.5rem] items-center'>
                                        <LuPenLine className='text-[1.5rem]' />
                                        <span className='text-[1rem] font-medium'>Podcasts</span>
                                    </div>
                                </div>
                                <DemoAudioPlayer />
                            </div>
                            <div className='bg-[#161616] w-[49%] h-full flex flex-col justify-start align-center gap-[1rem] items-center text-center pt-[1rem] rounded-[2rem]'>
                                <img className='rounded-full object-cover w-[8rem] h-[8rem]' src={russel} alt="error" />
                                <p className='text-white font-medium text-[1.4rem]'>Russel</p>

                                <div className='flex flex-row justify-center gap-[.5rem] w-full'>
                                    <div className='bg-[#2d2d2d] w-[10rem] h-[3rem] rounded-[2rem] flex flex-row justify-center gap-[0.5rem] items-center align-center'>
                                        <LuFileAudio className='text-[1.5rem]' />
                                        <span className='text-[1rem] font-medium'>Audiobooks</span>
                                    </div>
                                    <div className='bg-[#2d2d2d] w-[10rem] h-[3rem] rounded-[2rem] flex flex-row justify-center text-center align-center gap-[0.5rem] items-center'>
                                        <ImFilm className='text-[1.5rem]' />
                                        <span className='text-[1rem] font-medium'>Documentries</span>
                                    </div>
                                </div>
                                <DemoAudioPlayer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Studiogen;
