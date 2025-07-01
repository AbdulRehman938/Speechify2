import React, { useState, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import { IoMdPlay, IoMdPause } from 'react-icons/io';

const GenCont = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedSpeed, setSelectedSpeed] = useState('1X');
    const speedOptions = ['0.3X', '0.5X', '0.75X', '1X', '1.25X', '1.5X', '1.75X', '2X'];

    const speakers = [
        { name: 'John', gender: 'M', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { name: 'Emma', gender: 'F', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { name: 'Michael', gender: 'M', image: 'https://randomuser.me/api/portraits/men/76.jpg' },
        { name: 'Sophia', gender: 'F', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
    ];

    const [selectedSpeaker, setSelectedSpeaker] = useState(speakers[0]);
    const [showDropdown2, setShowDropdown2] = useState(false);

    const [text, setText] = useState('Create voice overs for Youtube videos, ads, corporate training, audiobooks, dubbing, or any use case you need.');
    const [characterCount, setCharacterCount] = useState(text.length);
    const [isPlaying, setIsPlaying] = useState(false);

    const synthRef = useRef(window.speechSynthesis);
    const utteranceRef = useRef(null);

    const handleTextChange = (e) => {
        const input = e.target.value;
        if (input.length <= 500) {
            setText(input);
            setCharacterCount(input.length);
        }
    };

    const handleSetTemplate = (template) => {
        let content = '';
        if (template === 'Podcast') {
            content = 'Welcome to our podcast. In today’s episode, we’ll explore emerging trends and discuss their impact.';
        } else if (template === 'Youtube') {
            content = 'Hey everyone! Welcome back to the channel. Don’t forget to like and subscribe for more videos like this!';
        } else if (template === 'Training') {
            content = 'This training session is designed to guide you through the basics and ensure you gain essential skills.';
        }
        setText(content);
        setCharacterCount(content.length);
    };

    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [selectedLang, setSelectedLang] = useState({
        country: 'US',
        language: 'English',
        accent: 'Standard',
    });

    const languages = [
        { country: 'US', language: 'English', accent: 'Standard' },
        { country: 'UK', language: 'English', accent: 'British' },
        { country: 'AU', language: 'English', accent: 'Australian' },
        { country: 'FR', language: 'French', accent: 'Parisian' },
        { country: 'IN', language: 'Hindi', accent: 'Neutral' },
    ];

    const handlePlay = () => {
        if (isPlaying) {
            synthRef.current.cancel();
            setIsPlaying(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = parseFloat(selectedSpeed.replace('X', '')) || 1;
        utterance.pitch = selectedSpeaker.gender === 'M' ? 0.9 : 1.2;
        utterance.lang =
            selectedLang.language === 'French'
                ? 'fr-FR'
                : selectedLang.language === 'Hindi'
                    ? 'hi-IN'
                    : selectedLang.language === 'English' && selectedLang.accent === 'British'
                        ? 'en-GB'
                        : selectedLang.language === 'English' && selectedLang.accent === 'Australian'
                            ? 'en-AU'
                            : 'en-US';

        utterance.onend = () => {
            setIsPlaying(false);
        };

        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
        setIsPlaying(true);
    };
    return (
        <>
            <div className='w-[30%] h-[70%] bg-blue-500 absolute z-[0] top-[8rem] right-[20rem] rounded-full opacity-[50%] blur-[5rem]'></div>
            <div className='w-[30%] h-[70%] bg-blue-500 absolute z-[0] top-[15rem] left-[20rem] rounded-full opacity-[50%] blur-[5rem]'></div>

            <div className='bg-white w-[55%] h-[35rem] relative top-[9rem] rounded-[2rem] flex flex-col align-center justify-start items-center p-[1rem]'>

                {/* Top Controls */}
                <div className='w-full h-[3rem] bg-white over-hidden flex flex-row justify-between align-center items-center'>
                    <div className='w-[40%] h-full flex flex-row justify-start gap-[1rem] align-center items-center'>
                        {/* Speaker Button */}
                        <div
                            className='relative h-full bg-white w-[11rem] border-gray-300 border-[0.13rem] flex flex-row justify-between align-center items-center px-2 py-1 rounded-[1rem] cursor-pointer hover:bg-gray-100'
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <img src={selectedSpeaker.image} alt="speaker" className="w-8 h-8 rounded-full object-cover" />
                            <div className="ml-2 text-sm flex flex-row gap-[.3rem]">
                                <span className="font-normal text-black text-xl">{selectedSpeaker.name}</span>
                                <span className="text-xl font-medium text-black">({selectedSpeaker.gender})</span>
                            </div>
                            <div className="ml-auto px-1 text-black">
                                {showDropdown ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
                            </div>

                            {showDropdown && (
                                <ul className="absolute top-[110%] left-0 w-[11rem] bg-white border-gray-300 border-[0.13rem] rounded-[1rem] z-10 shadow-lg">
                                    {speakers
                                        .filter((s) => s.name !== selectedSpeaker.name)
                                        .map((speaker, idx) => (
                                            <li
                                                key={idx}
                                                className="flex flex-row items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-[1rem]"
                                                onClick={() => {
                                                    setSelectedSpeaker(speaker);
                                                    setShowDropdown(false);
                                                }}
                                            >
                                                <img src={speaker.image} alt={speaker.name} className="w-8 h-8 rounded-full object-cover" />
                                                <div className="flex flex-row text-sm gap-[0.3rem]">
                                                    <span className="font-normal text-black text-xl">{speaker.name}</span>
                                                    <span className="text-xl font-medium text-black">({speaker.gender})</span>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>

                        {/* Speed Button */}
                        <div
                            className='relative h-full bg-white w-[9rem] border-gray-300 border-[0.13rem] flex flex-row justify-between align-center items-center px-2 py-1 rounded-[1rem] cursor-pointer hover:bg-gray-100'
                            onClick={() => setShowDropdown2(!showDropdown2)}
                        >
                            <div className="ml-2 text-sm flex flex-row gap-[.3rem]">
                                <span className="font-normal text-black text-xl">Speed:</span>
                                <span className="font-medium text-black text-xl">{selectedSpeed}</span>
                            </div>
                            <div className="ml-auto px-1 text-black">
                                {showDropdown2 ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
                            </div>

                            {showDropdown2 && (
                                <ul className="absolute top-[110%] left-0 w-[11rem] bg-white border-gray-300 border-[0.13rem] rounded-[1rem] z-10 shadow-lg">
                                    {speedOptions
                                        .filter((speed) => speed !== selectedSpeed)
                                        .map((speed, idx) => (
                                            <li
                                                key={idx}
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-[1rem] text-black text-sm text-left"
                                                onClick={() => {
                                                    setSelectedSpeed(speed);
                                                    setShowDropdown2(false);
                                                }}
                                            >
                                                {speed}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Download & Play Buttons */}
                    <div className='w-[40%] h-full flex flex-row justify-end gap-[1rem] align-center items-center'>
                        <div className='h-full w-[10rem] gap-[0.4rem] bg-white text-black border-gray-300 border-[0.1rem] rounded-[1rem] p-[1rem] flex justify-center align-center items-center hover:bg-gray-200 cursor-pointer'>
                            <MdOutlineFileDownload className='text-3xl' />
                            <span className='font-medium'>Download</span>
                        </div>
                        <div id='play' onClick={handlePlay} className='h-full gap-[0.5rem] w-[10rem] bg-[#2f43fa] text-white rounded-[1rem] p-[1rem] flex justify-center align-center items-center hover:bg-[#1524ad] cursor-pointer'>
                            {isPlaying ? <IoMdPause className='text-2xl' /> : <IoMdPlay className='text-2xl' />}
                            <span className='font-medium text-2xl'>{isPlaying ? 'Pause' : 'Play'}</span>
                        </div>
                    </div>
                </div>

                {/* Text Area */}
                <div className='w-full h-[23rem] bg-white mt-[2rem]'>
                    <textarea
                        name="input"
                        id="speech"
                        value={text}
                        onChange={handleTextChange}
                        className='text-2xl font-normal text-black w-full h-full resize-none overflow-y-auto outline-none border-none focus:outline-none focus:ring-0'
                    />
                </div>

                {/* Bottom Controls */}
                <div className='w-full h-[3rem] bg-white mt-[2rem] flex flex-row justify-between align-center items-center text-center'>
                    <div className='h-full w-[30rem] bg-white flex flex-row justify-start align-center items-center gap-[0.5rem]'>
                        {/* Language Selector */}
                        <div className='relative h-full'>
                            <div
                                className='h-full w-[9rem] bg-gray-300 text-black rounded-[1rem] border-gray-200 flex flex-row justify-around items-center align-center border-[0.1rem] hover:bg-gray-400 cursor-pointer'
                                onClick={() => setShowLangDropdown(!showLangDropdown)}
                            >
                                <span className='font-xs text-black'>{selectedLang.country}</span>
                                <span className='text-xl text-black'>{selectedLang.language}</span>
                                <FaChevronDown className="w-3 h-3" />
                            </div>

                            {showLangDropdown && (
                                <ul className="absolute bottom-[110%] left-0 w-[17rem] bg-white border border-gray-300 rounded-[1rem] shadow-md z-50">
                                    {languages
                                        .filter(
                                            (lang) =>
                                                lang.country !== selectedLang.country ||
                                                lang.language !== selectedLang.language ||
                                                lang.accent !== selectedLang.accent
                                        )
                                        .map((lang, idx) => (
                                            <li
                                                key={idx}
                                                className="px-3 py-2 text-black text-sm hover:bg-gray-100 cursor-pointer rounded-[1rem]"
                                                onClick={() => {
                                                    setSelectedLang(lang);
                                                    setShowLangDropdown(false);
                                                }}
                                            >
                                                {lang.country} - {lang.language} ({lang.accent})
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>

                        {/* Template Buttons */}
                        <div onClick={() => handleSetTemplate('Podcast')} className='h-full w-[7rem] bg-gray-300 text-black rounded-[1rem] border-gray-200 flex justify-center items-center border-[0.1rem] hover:bg-gray-400 cursor-pointer'>Podcast</div>
                        <div onClick={() => handleSetTemplate('Youtube')} className='h-full w-[7rem] bg-gray-300 text-black rounded-[1rem] border-gray-200 flex justify-center items-center border-[0.1rem] hover:bg-gray-400 cursor-pointer'>Youtube</div>
                        <div onClick={() => handleSetTemplate('Training')} className='h-full w-[7rem] bg-gray-300 text-black rounded-[1rem] border-gray-200 flex justify-center items-center border-[0.1rem] hover:bg-gray-400 cursor-pointer'>Training</div>
                    </div>

                    {/* Character Counter */}
                    <div className='h-full w-[10rem] bg-white text-black flex justify-center items-center text-lg'>
                        {characterCount}/500 characters
                    </div>
                </div>

            </div>
            <div className="w-[20%] h-[4rem] bg-white mt-10 rounded-[1rem] flex justify-center items-center text-center cursor-pointer relative z-30 top-[10rem] hover:scale-[105%]">
                <h1 className="text-black text-xl font-medium">Experience full Speechify Studio</h1>
            </div>
        </>
    )
}

export default GenCont;