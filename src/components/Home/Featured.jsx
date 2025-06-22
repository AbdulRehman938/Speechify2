import React, { useState, useRef, useEffect } from 'react';
import * as framer from 'framer-motion';
const { motion, AnimatePresence } = framer;
import forbs from "../../assets/images/forbes.png"
import cbs from "../../assets/images/cbs.png"
import time from "../../assets/images/time.png"
import nyTime from "../../assets/images/NY-time.png"
import wallstreet from "../../assets/images/wall_street.png"
import downloadapp from "../../assets/icons/download-app.svg"

import { FaAndroid, FaApple, FaChrome, FaDesktop, FaGlobe } from 'react-icons/fa';
import { BsBrowserEdge } from 'react-icons/bs';


const tabsWithIcons = [
    {
        label: 'WEB APP',
        icon: <FaGlobe />,
        content: {
            text: 'The fastest way to read any PDF, book, or doc and make it stick. Integrates with Google Drive, Dropbox, Canvas & more.',
            button: 'Try For Free',
            image: null,
            video: 'https://website.cdn.speechify.com/02-DEMOS-web_app@2x-1.mp4',
        },
    },
    {
        label: 'iOS',
        icon: <FaApple />,
        content: {
            text: 'Let Speechify read to you while you commute, exercise, and run errands. Breeze through PDFs, books, articles, emails — anything.',
            button: null,
            image: {downloadapp},
            video: 'https://website.cdn.speechify.com/02-DEMOS-iphone@2x-1.mp4',
        },
    },
    {
        label: 'ANDROID',
        icon: <FaAndroid />,
        content: {
            text: 'Let Speechify read to you while you walk to work, go for a run, or do laundry. Get through PDFs, books, articles, docs & emails twice as fast.',
            button: null,
            image: 'src/assets/icons/get-play.svg',
            video: 'https://website.cdn.speechify.com/02-DEMOS-android@2x-1.mp4',
        },
    },
    {
        label: 'CHROME EXTENSION',
        icon: <FaChrome />,
        content: {
            text: 'Read up to 4.5x faster by listening with Speechify. Listen to Google Docs, emails, articles & more seamlessly on Chrome.',
            button: null,
            image: 'src/assets/icons/add-chrome.svg',
            video: 'https://website.cdn.speechify.com/02-DEMOS-chrome_extension@2x-1.mp4',
        },
    },
    {
        label: 'MAC APP',
        icon: <FaDesktop />,
        content: {
            text: 'Use Speechify from your Dock to read PDFs, Word docs, emails & more. Listen and read at the same time to read faster and retain more.',
            button: null,
            image: 'src/assets/icons/mac-app.svg',
            video: 'https://website.cdn.speechify.com/02-DEMOS-mac_app@2x-1.mp4',
        },
    },
    {
        label: 'EDGE',
        icon: <BsBrowserEdge />,
        content: {
            text: 'Listen to any website on Microsoft Edge with our Edge Extension. Emails, news, docs – anything.',
            button: null,
            image: 'src/assets/icons/edge-app.svg',
            video: 'https://website.cdn.speechify.com/02-DEMOS-edge_extension@2x.mp4',
        },
    },
];

const Featured = () => {
    const [tabActiveIndex, setTabActiveIndex] = useState(0);
    const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 10 });

    const ulRef = useRef(null);

    useEffect(() => {
        const ul = ulRef.current;
        if (!ul) return;

        const li = ul.children[tabActiveIndex];
        if (li) {
            const { offsetLeft, clientWidth } = li;
            setSliderStyle({
                left: offsetLeft + clientWidth / 2 - 40, // Adjusted to center and move a little right
                width: 90,
            });
        }
    }, [tabActiveIndex]);


    return (
        <>
            <div className='w-[75%] h-[10rem] bg-black relative top-[20rem] mb-[10rem] flex flex-col justify-center items-center gap-4'>
                <h1 className='text-gray-600 font-medium text-3xl'>Featured In</h1>
                <div className='w-[75%] h-[4rem] bg-black mt-[2rem] overflow-hidden flex justify-between items-center align-center'>
                    <img src={forbs} alt="error" />
                    <img src={cbs} alt="error" />
                    <img src={time} alt="error" />
                    <img src={nyTime}  alt="error" />
                    <img src={wallstreet} alt="error" />
                </div>
            </div>
            <div className='w-[75%] h-[40rem] bg-black mt-[20rem] flex flex-col'>
                <h1 className='text-[6rem] text-white border-b-[0.2rem] relative z-10 border-b-gray-800 pb-[1rem]'>LISTEN ANYWHERE</h1>

                <div className="flex flex-col justify-center mt-[-0.2rem] ml-[25rem] relative z-20">
                    {/* Slider */}
                    <div
                        className="relative top-0 h-[0.2rem] bg-white rounded-full transition-all duration-300"
                        style={{
                            width: sliderStyle.width,
                            left: sliderStyle.left,
                        }}
                    />

                    <ul ref={ulRef} className="flex gap-6 relative">
                        {tabsWithIcons.map((tab, index) => (
                            <li
                                key={tab.label}
                                onClick={() => setTabActiveIndex(index)}
                                className={`relative flex items-center gap-2 cursor-pointer px-4 py-2 text-lg text-white transition-opacity duration-200 hover:opacity-60 right-[26rem]`}
                            >
                                <span className="text-xl">{tab.icon}</span>
                                <span>{tab.label}</span>
                            </li>
                        ))}
                    </ul>

                    <div className='h-[30rem] w-[90rem] relative right-[25rem] bg-black mt-[3rem] flex flex-row justify-between align-center items-center'>
                        {/* Left Content with Transition */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={'left-' + tabActiveIndex}
                                className='w-[40%] h-full flex flex-col justify-start bg-black pt-[5rem] ]'
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className='text-3xl text-white font-bold mb-4'>{tabsWithIcons[tabActiveIndex].content.text}</h2>
                                <button className="mt-8 px-6 py-3 bg-white text-black rounded-lg hover:bg-blue-700 transition-all duration-300 w-fit h-[3rem] flex items-center justify-center">
                                    {tabsWithIcons[tabActiveIndex].content.button ? (
                                        tabsWithIcons[tabActiveIndex].content.button
                                    ) : tabsWithIcons[tabActiveIndex].content.image ? (
                                        <img
                                            src={tabsWithIcons[tabActiveIndex].content.image}
                                            alt="Button Image"
                                            className="h-full object-cover"
                                        />
                                    ) : null}
                                </button>



                            </motion.div>

                            {/* Right Video with Transition */}
                            <motion.div
                                key={'right-' + tabActiveIndex}
                                className='w-[50%] h-full flex justify-center items-center bg-black p-4'
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 40 }}
                                transition={{ duration: 0.5 }}
                            >
                                <video
                                    src={tabsWithIcons[tabActiveIndex].content.video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className='w-full h-full object-cover rounded-lg'
                                />

                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Featured