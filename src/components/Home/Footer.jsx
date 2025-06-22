import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoTiktok } from "react-icons/io5";
import app from "/src/assets/icons/Appstore.svg"
import google from "/src/assets/icons/google-play.svg"
import logo from "/src/assets/icons/speechify-logo-v1.svg"
import { PiCopyrightFill } from "react-icons/pi";

const Footer = () => {
    return (
        <>
            <div className='w-[75%] h-[80rem] bg-black relative bottom-0 mt-[15rem] flex flex-col justify-start align-center items-center border-t-[0.1rem] border-t-gray-700'>
                <div className='w-full h-[22rem] bg-black mt-[3rem] flex flex-row justify-between align-center items-center'>
                    <div className='bg-black w-[14.5rem] h-full flex flex-col justify-start align-start items-start text-start'>
                        <h2 className='text-gray-400 font-medium text-[1.3rem]'>Text to Speech</h2>
                        <ul className='flex flex-col justify-start align-start items-start mt-[1rem] gap-[0.5rem]'>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>iPhone and iPad Apps</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Android Apps</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Mac App</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Web App</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Chrome Extension</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Edge Add-on</li>
                        </ul>
                    </div>
                    <div className='bg-black w-[14.5rem] h-full flex flex-col justify-start align-start items-start text-start'>
                        <h2 className='text-gray-400 font-medium text-[1.3rem]'>For Creators</h2>
                        <ul className='flex flex-col justify-start align-start items-start mt-[1rem] gap-[0.5rem]'>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>AI Voice Generator</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Dubbing</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Voice Cloning</li>
                        </ul>
                    </div>
                    <div className='bg-black w-[14.5rem] h-full flex flex-col justify-start align-start items-start text-start'>
                        <h2 className='text-gray-400 font-medium text-[1.3rem]'>For Business</h2>
                        <ul className='flex flex-col justify-start align-start items-start mt-[1rem] gap-[0.5rem]'>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Teams</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Education</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Try Text to Speech API</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Text to Speech API for Enterprise</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Text to Speech API Docs</li>
                        </ul>
                    </div>
                    <div className='bg-black w-[14.5rem] h-full flex flex-col justify-start align-start items-start text-start'>
                        <h2 className='text-gray-400 font-medium text-[1.3rem]'>Company</h2>
                        <ul className='flex flex-col justify-start align-start items-start mt-[1rem] gap-[0.5rem]'>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>About</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Contact</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Blog</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Careers</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Affilates</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Help</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Status</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Press</li>
                            <li className='text-white font-meium cursor-pointer hover:text-gray-400 hover:scale-[105%] text-[1.1rem]'>Band Kit</li>
                        </ul>
                    </div>
                    <div className='bg-black w-[14.5rem] h-full flex flex-col justify-start align-start items-start text-start'>
                        <h2 className='text-gray-400 font-medium text-[1.3rem]'>Follow Speechify</h2>
                        <div className='w-full h-[5rem] bg-black mt-[2rem] flex flex-col'>
                            <div className='w-[80%] h-[5rem] flex justify-between align-center items-center'>
                                <FaInstagram className='text-white text-[1.5rem] cursor-pointer hover:scale-[110%] hover:text-gray-400' />
                                <FaFacebookF className='text-white text-[1.5rem] cursor-pointer hover:scale-[110%] hover:text-gray-400' />
                                <BsTwitterX className='text-white text-[1.5rem] cursor-pointer hover:scale-[110%] hover:text-gray-400' />
                            </div>
                            <div className='w-[80%] h-[5rem] flex justify-between align-center items-center'>
                                <IoLogoTiktok className='text-white text-[1.5rem] cursor-pointer hover:scale-[110%] hover:text-gray-400' />
                                <FaLinkedinIn className='text-white text-[1.5rem] cursor-pointer hover:scale-[110%] hover:text-gray-400' />
                                <FaYoutube className='text-white text-[1.5rem] cursor-pointer hover:scale-[110%] hover:text-gray-400' />
                            </div>
                        </div>
                    </div>
                    <div className='bg-black w-[14.5rem] h-full flex flex-col justify-start align-start items-start text-start'>
                        <h2 className='text-gray-400 font-medium text-[1.3rem]'>Get The App</h2>
                        <div className='flex flex-col w-full h-[8rem] mt-[1rem] bg-black gap-[1rem]'>
                            <button className='w-[11rem] h-[3.5rem] bg-white rounded-[1rem] flex justify-center items-center align-center hover:opacity-80'>
                                <img src={app} alt="error" />
                            </button>
                            <button className='w-[11rem] h-[3.5rem] bg-white rounded-[1rem] flex justify-center items-center align-center hover:opacity-80'>
                                <img src={google} alt="error" />
                            </button>
                        </div>
                    </div>

                </div>
                <div className='w-full h-[25rem] bg-black mt-[3rem]'>
                    <h2 className='text-gray-400 text-[2rem] font-medium'>Recommended Reading</h2>
                    <div className='w-full h-[22rem] bg-black flex flex-row justify-between pt-[2rem]'>
                        <div className='w-[50%] h-full flex flex-col justify-start align-start items-start'>
                            <ul className='flex flex-col justify-start align-start items-start gap-[0.3rem]'>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>Audiobook vs. Reading</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>Text to Speech Reader</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>Male Voice Generator</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>Robot Voice Generator</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>Cartoon Character Voice Generator</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>PDF Audio Generator</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>Text to Speech Voice Generator</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>PDF Read Cloud</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>Texto a Voz</li>
                            </ul>
                        </div>
                        <div className='w-[50%] h-full flex flex-col justify-start align-start items-start'>
                            <ul className='flex flex-col justify-start align-start items-start gap-[0.3rem]'>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>PDF Text to Speech Android</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>Female Voice Generator</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>Top Dislexia Reading Program</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>Text to Speech Anime</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>AI Voice Changer</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>Can Google Docs Read to Me</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>Hindi Text to Speech</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>AI Voice Generator</li>
                                <li className='text-white text-[1.1rem] font-medium cursor-pointer hover:text-gray-400 hover:scale-[105%]'>Leitor de Texto</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='w-full h-[23rem] flex justify-start flex-col bg-black mt-[3rem]'>
                    <h2 className='text-gray-300 font-medium text-[2.4rem]'>View in other languages</h2>
                    <div className='w-full h-[14rem] flex flex-row mt-[1rem]'>
                        <div className='bg-black flex flex-col justify-start align-start w-[24%] pt-[1rem]'>
                            <ul className='flex flex-col justify-start align-start items-start gap-[0.5rem]'>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>中文 (简体)</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>Nederlands</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>हिन्दी</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>Norsk bokmål</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>Español</li>
                            </ul>
                        </div>
                        <div className='bg-black h-full flex flex-col justify-start align-start w-[24%]'>
                            <ul className='flex flex-col justify-start align-start items-start gap-[0.5rem]'>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>中文 (台灣)</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>Français</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>Italiano</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>Polski</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>Svenska</li>
                            </ul>
                        </div>
                        <div className='bg-black h-full flex flex-col justify-start align-start w-[24%]'>
                            <ul className='flex flex-col justify-start align-start items-start gap-[0.5rem]'>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>Čeština</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>Suomi</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>日本語</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>Português Brasileiro</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>ไทย</li>
                            </ul>
                        </div>
                        <div className='bg-black h-full flex flex-col justify-start align-start w-[24%]'>
                            <ul className='flex flex-col justify-start align-start items-start gap-[0.5rem]'>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>Dansk</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>Duetsch</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>한국어</li>
                                <li className='text-white font-medium text-[1.3rem] cursor-pointer hover:text-gray-300 hover:scale-[110%]'>한국어</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='relative bottom-0 w-full h-[6rem] border-t-[0.1rem] border-t-gray-700 flex justify-between align-center items-center text-center'>
                    <img src={logo} alt="error" />
                    <div className='h-full w-[25rem] flex flex-row justify-between align-center items-center text-center'>
                        <span className='text-gray-700 text-[0.9rem] cursor-pointer hover:text-white'>Terms & Conditions</span>
                        <span className='text-gray-700 text-[0.9rem] cursor-pointer hover:text-white'>Privacy Policy</span>
                        <span className='text-gray-700 text-[0.9rem] cursor-pointer hover:text-white flex flex-row text-center items-center justify-center gap-[0.4rem]'>
                            <PiCopyrightFill className='text-[1.2rem]' />
                            Speechify Inc. 2025</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer