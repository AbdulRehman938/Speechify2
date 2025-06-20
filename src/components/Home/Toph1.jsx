import React, { useState } from 'react';
import snoopDoggImage from '/src/assets/images/Snoop-large@2x.webp';
import cliffWeitzmanImage from '/src/assets/images/Cliff-img.png';
import gwynethImage from '/src/assets/images/Gwyneth-img.png';
import mrBeastImage from '/src/assets/images/Beast-img.png';
import emily from '/src/assets/images/Emily-img.png';
import aliAbdaal from '/src/assets/images/Ali_Abdaal-img.png';
import benjamin from '/src/assets/images/Benjamin-img.png';
import pointer from '/src/assets/icons/pointer.svg';

const flagImages = {
    English: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/us.svg',
    Spanish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/mx.svg',
    French: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/fr.svg',
    German: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/de.svg',
    Portuguese: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/br.svg',
    Chinese: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/cn.svg',
    Italian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/it.svg',
    Tamil: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/in.svg',
    Japanese: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/jp.svg',
    Dutch: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/nl.svg',
    Korean: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/kr.svg',
    Arabic: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ae.svg',
    Russian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ru.svg',
    Urdu: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/pk.svg',
    'Norwegian Bokmål': 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/no.svg',
    Polish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/pl.svg',
    Swedish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/se.svg',
    Afrikaans: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/za.svg',
    Bulgarian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/bg.svg',
    Bangla: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/bd.svg',
    Catalan: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/es-ct.svg',
    Czech: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/cz.svg',
    Danish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/dk.svg',
    Greek: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/gr.svg',
    Estonian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ee.svg',
    Persian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ir.svg',
    Finnish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/fi.svg',
    Filipino: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ph.svg',
    Irish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ie.svg',
    Hebrew: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/il.svg',
    Hindi: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/in.svg',
    Croatian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/hr.svg',
    Hungarian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/hu.svg',
    Indonesian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/id.svg',
    Icelandic: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/is.svg',
    Georgian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ge.svg',
    Kazakh: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/kz.svg',
    Lithuanian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/lt.svg',
    Latvian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/lv.svg',
    Malay: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/my.svg',
    Nepali: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/np.svg',
    Romanian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ro.svg',
    Sinhala: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/lk.svg',
    Slovak: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/sk.svg',
    Slovenian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/si.svg',
    Swahili: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/tz.svg',
    Telugu: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/in.svg',
    Thai: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/th.svg',
    Turkish: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/tr.svg',
    Ukrainian: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ua.svg',
    Vietnamese: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/vn.svg',
    Cantonese: 'https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/hk.svg',
};

const languages = [
    { name: "English", flag: flagImages.English },
    { name: "Spanish", flag: flagImages.Spanish },
    { name: "French", flag: flagImages.French },
    { name: "German", flag: flagImages.German },
    { name: "Portuguese", flag: flagImages.Portuguese },
    { name: "Chinese", flag: flagImages.Chinese },
    { name: "Italian", flag: flagImages.Italian },
    { name: "Tamil", flag: flagImages.Tamil },
    { name: "Japanese", flag: flagImages.Japanese },
    { name: "Dutch", flag: flagImages.Dutch },
    { name: "Korean", flag: flagImages.Korean },
    { name: "Arabic", flag: flagImages.Arabic },
    { name: "Russian", flag: flagImages.Russian },
    { name: "Urdu", flag: flagImages.Urdu },
    { name: "Norwegian Bokmål", flag: flagImages['Norwegian Bokmål'] },
    { name: "Polish", flag: flagImages.Polish },
    { name: "Swedish", flag: flagImages.Swedish },
    { name: "Afrikaans", flag: flagImages.Afrikaans },
    { name: "Bulgarian", flag: flagImages.Bulgarian },
    { name: "Bangla", flag: flagImages.Bangla },
    { name: "Catalan", flag: flagImages.Catalan },
    { name: "Czech", flag: flagImages.Czech },
    { name: "Danish", flag: flagImages.Danish },
    { name: "Greek", flag: flagImages.Greek },
    { name: "Estonian", flag: flagImages.Estonian },
    { name: "Persian", flag: flagImages.Persian },
    { name: "Finnish", flag: flagImages.Finnish },
    { name: "Filipino", flag: flagImages.Filipino },
    { name: "Irish", flag: flagImages.Irish },
    { name: "Hebrew", flag: flagImages.Hebrew },
    { name: "Hindi", flag: flagImages.Hindi },
    { name: "Croatian", flag: flagImages.Croatian },
    { name: "Hungarian", flag: flagImages.Hungarian },
    { name: "Indonesian", flag: flagImages.Indonesian },
    { name: "Icelandic", flag: flagImages.Icelandic },
    { name: "Georgian", flag: flagImages.Georgian },
    { name: "Kazakh", flag: flagImages.Kazakh },
    { name: "Lithuanian", flag: flagImages.Lithuanian },
    { name: "Latvian", flag: flagImages.Latvian },
    { name: "Malay", flag: flagImages.Malay },
    { name: "Nepali", flag: flagImages.Nepali },
    { name: "Romanian", flag: flagImages.Romanian },
    { name: "Sinhala", flag: flagImages.Sinhala },
    { name: "Slovak", flag: flagImages.Slovak },
    { name: "Slovenian", flag: flagImages.Slovenian },
    { name: "Swahili", flag: flagImages.Swahili },
    { name: "Telugu", flag: flagImages.Telugu },
    { name: "Thai", flag: flagImages.Thai },
    { name: "Turkish", flag: flagImages.Turkish },
    { name: "Ukrainian", flag: flagImages.Ukrainian },
    { name: "Vietnamese", flag: flagImages.Vietnamese },
    { name: "Cantonese", flag: flagImages.Cantonese },
];

const Toph1 = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English'); // For language button state
    const [speakingIndex, setSpeakingIndex] = useState(null); // For speaker play/pause visual state
    const [textInput, setTextInput] = useState("Cliff Weitzman is the founder of Speechify.\n\nCliff is also dyslexic.\n\nGrowing up, Cliff’s dad would read him Harry Potter because he couldn't do it himself. Cliff’s dad was his hero.\n\nBut without reading, Cliff couldn't become the person he wanted to be. So, he learned to code and created Speechify to read books to himself.\n\nToday, Speechify helps over 50 million people read faster, remember more, and save time.");

  

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

    const [isPlayingMainText, setIsPlayingMainText] = useState(false); // New state for the global play button
    return (
        <>
            <div className='bg-gray-100/20 w-[75%] h-[0.1rem]'></div>
            <h1 className='text-[3rem] text-[white] font-bold relative top-[3rem] right-[30rem]'>Try Our AI Voices</h1>

            <div id='speech-content' className='bg-white h-[45rem] w-[75%] relative top-[8rem] rounded-[2rem] flex flex-col justify-between p-[24px] lg:px-[48px] lg:py-[32px]'>
                <div className="font-ABCDiatype text-glass-800 -mx-4 lg:mx-0 flex-grow" data-testid="voice-demo">
                    <div>
                        <div className="flex flex-col items-start gap-1 lg:mx-0 lg:flex-row lg:items-center lg:gap-4">
                            <div className="whitespace-nowrap text-sm font-medium lg:mx-0 lg:text-base text-black">
                                <span>Generate text in</span>
                            </div>
                            <div className="flex w-full min-w-0 flex-1 items-center lg:gap-1">
                                <button aria-label="previous" className="relative hidden rounded-full p-2 text-lg font-medium transition-all duration-300 ease-out hover:bg-[#F1F4F9] lg:block opacity-0 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" className="mr-px text-xl" viewBox="0 0 24 24">
                                        <path fill="currentColor" fillRule="evenodd" d="M15.707 5.293a1 1 0 0 1 0 1.414L10.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0Z" clipRule="evenodd"></path>
                                    </svg>
                                </button>
                                <div className="relative min-w-0 flex-1">
                                    <span className="absolute inset-y-0 left-0 z-10 hidden w-8 bg-gradient-to-r from-white to-transparent lg:block lg:w-10 lg:hidden"></span>
                                    <div className="no-scrollbar w-full max-w-full overflow-auto">
                                        <div className="flex gap-2 leading-none">
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.name}
                                                    onClick={() => handleLanguageSelect(lang.name)}
                                                    className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 px-[14px] py-[10px] text-xs font-medium leading-normal transition-colors hover:border-[#e4eaf1] hover:bg-[#e4eaf1] md:rounded-2xl md:px-4 md:text-[16px] text-black
                                                ${selectedLanguage === lang.name ? 'bg-white !border-[#F3F6FA]' : 'bg-[#F1F4F9] border-transparent'}
                                                `}
                                                >
                                                    <img alt={lang.name} loading="lazy" width="16" height="12" decoding="async" data-nimg="1" className="flex min-w-4 items-center object-cover" style={{ color: 'transparent' }} src={lang.flag} />
                                                    <div className="min-w-0 whitespace-nowrap">{lang.name}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="bg-reg absolute inset-y-0 right-0 z-10 hidden w-8 bg-gradient-to-r from-transparent to-white lg:block lg:w-10"></span>
                                </div>
                                <button aria-label="next" className="relative hidden rounded-full p-2 text-lg transition-all duration-300 ease-out hover:bg-[#F1F4F9] lg:block">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" className="ml-px text-xl" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            d="M8.293 5.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L13.586 12 8.293 6.707a1 1 0 0 1 0-1.414Z"
                                            clipRule="evenodd"
                                        />

                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 lg:mt-10 lg:flex-row lg:gap-4">
                            <div className="flex-1">
                                <div className="mt-4 xl:w-11/12 styles_textAreaWrapper__tzqm2">
                                    <div className="relative">
                                        <span className="absolute inset-x-0 top-0 z-20 h-8 bg-gradient-to-b from-white to-transparent lg:h-10 hidden"></span>
                                        <div className="relative h-[320px] overflow-y-auto p-2 pb-12 text-left lg:h-[480px] text-content-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" className="pointer-events-none absolute top-[9px] size-5 animate-pulse" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.5971 4.70154L13.624 3.67466C14.3562 2.94243 15.5434 2.94243 16.2756 3.67466C17.0079 4.4069 17.0079 5.59408 16.2756 6.32631L15.2488 7.35319L12.5971 4.70154ZM11.2713 6.02736L4.78516 12.5135L7.43681 15.1651L13.9229 8.67901L11.2713 6.02736Z" fill="#1E49EE"></path>
                                                <path d="M3.26512 15.8568L4.78516 12.5127L7.43681 15.1643L4.09272 16.6844C3.56699 16.9234 3.02615 16.3825 3.26512 15.8568Z" fill="#1E49EE"></path>
                                            </svg>
                                            <div className="relative z-10 h-full">
                                                <textarea
                                                    className="h-full w-full [&>p]:h-full [&>p]:indent-6 outline-none resize-none text-black bg-transparent"
                                                    value={textInput}
                                                    onChange={handleTextInputChange}
                                                    rows={10}
                                                    spellCheck="false"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <span className="absolute inset-x-0 bottom-0 z-20 h-8 bg-gradient-to-t from-white to-transparent lg:h-10 hidden"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex-1">
                                <span className="absolute inset-x-0 top-0 z-20 h-8 bg-gradient-to-b from-white to-transparent lg:h-10 hidden"></span>
                                <span className="absolute inset-x-0 bottom-0 z-20 h-8 bg-gradient-to-t from-white to-transparent lg:h-10 hidden"></span>
                                <div className="no-scrollbar -mx-6 w-[101%] grid max-h-[500px] auto-cols-max grid-flow-col justify-between gap-4 overflow-y-auto px-6 py-4 lg:mx-0 lg:grid-flow-row lg:grid-cols-4 lg:px-0 xl:gap-x-5 lg:gap-x-3">
                                    {/* All speakers for inside 'speech-content' div */}
                                    {speakerData.map((speaker, i) => (
                                        <div key={i} className="z-80 group relative flex flex-col items-center gap-3 cursor-pointer">
                                            <div
                                                className={`h-[9rem] w-[9rem] rounded-full overflow-hidden hover:bg-blue-100 cursor-pointer animate-fade-in
                                            ${speaker.name === "Sign In" ? 'bg-white' : 'bg-white'} `}
                                            >
                                                <img
                                                    className={`object-cover ${speaker.name === "Sign In" ? 'h-[2rem] w-[2rem] relative left-[3.3rem] mt-10' : 'h-full w-full'}`}
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                />
                                                {speaker.name === "Sign In" && (
                                                    <span className="text-gray-500 font-bold text-[1.3rem] relative left-[3rem] block mt-1">200+</span>
                                                )}
                                            </div>
                                            {speaker.name !== "Sign In" && ( // Conditionally render play button
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
                                            )}
                                            <div className="mt-2 text-center text-black">
                                                <p className="font-semibold text-lg text-black">{speaker.name}</p>
                                                <p className="text-sm text-gray-600">{speaker.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Global Play Button for the main text input */}
                <div className="w-full flex justify-center mt-4">
                    <button
                        className="flex items-center justify-center relative bottom-[1rem] rounded-full bg-[#2f43fa] text-white p-4 shadow-lg hover:bg-[#1e2bfa] transition-colors duration-300 transform scale-100 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={toggleMainTextPlayback}
                        aria-label={isPlayingMainText ? 'Pause main text' : 'Play main text'}
                    >
                        <svg width="3em" height="3em" viewBox="0 0 16 16" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d={
                                    isPlayingMainText
                                        ? 'M5.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 .5-.5z'
                                        : 'M7.05 10.8579L10.95 8.60622C11.4167 8.33679 11.4167 7.66321 10.95 7.39378L7.05 5.14212C6.58333 4.87269 6 5.20947 6 5.74833V10.2517C6 10.7905 6.58333 11.1273 7.05 10.8579Z'
                                }
                            />
                        </svg>
                    </button>
                </div>
            </div>

        </>
    )
}

export default Toph1;