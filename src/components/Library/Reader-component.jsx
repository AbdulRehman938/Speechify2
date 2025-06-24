import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IoClose } from 'react-icons/io5'; // Import the close icon


const ReaderComponent = ({ file, onClose }) => { // Accept file and onClose props
    // Panel state management
    const [isSidePanelLeftOpen, setIsSidePanelLeftOpen] = useState(false);
    const [isSidePanelRightOpen, setIsSidePanelRightOpen] = useState(false);
    const [activeRightPanel, setActiveRightPanel] = useState(null); // 'search' or 'settings'

    // Playback states
    const [isPlaying, setIsPlaying] = useState(false); // New state for play/pause
    const [currentSpeed, setCurrentSpeed] = useState(1.0); // New state for playback speed
    const [isAutoscrollActive, setIsAutoscrollActive] = useState(false); // New state for autoscroll

    // Display and content states
    const [fontSizeScale, setFontSizeScale] = useState(1.0); // New state for font size scaling (1.0 = normal)
    const [fileTextContent, setFileTextContent] = useState(''); // State to hold the read text content
    const [displayedContent, setDisplayedContent] = useState(''); // Content with highlights for search
    const [readingMessage, setReadingMessage] = useState(''); // Message displayed in the reader area

    // Search states
    const [searchTerm, setSearchTerm] = useState('');

    // Settings states
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [availableVoices, setAvailableVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [pitch, setPitch] = useState(1.0); // Default pitch
    const [volume, setVolume] = useState(1.0); // Default volume

    // Player time states (static for this demo)
    const [currentTime, setCurrentTime] = useState('0:00'); // Always initialized
    const [totalTime, setTotalTime] = useState('0:00');     // Always initialized

    // Refs for DOM elements
    const playerRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const utteranceRef = useRef(null);

    // Speech Synthesis API
    const synth = window.speechSynthesis;

    // Define panel width for consistent calculations
    const panelWidth = 400; // px

    // Helper for dynamic transform styles based on state
    const getPanelTransform = useCallback((isOpen, direction) => {
        if (isOpen) {
            return 'translateX(0px)';
        }
        return direction === 'left' ? `translateX(-${panelWidth}px)` : `translateX(${panelWidth}px)`;
    }, [panelWidth]);

    // Function to speak text
    const speakText = useCallback((text) => {
        if (!text) return; // Don't speak if text is empty

        if (synth.speaking) {
            synth.cancel(); // Stop current speech if any
        }

        utteranceRef.current = new SpeechSynthesisUtterance(text);
        utteranceRef.current.rate = currentSpeed; // Apply current speed
        utteranceRef.current.pitch = pitch; // Apply current pitch
        utteranceRef.current.volume = volume; // Apply current volume
        if (selectedVoice) {
            utteranceRef.current.voice = selectedVoice;
        }

        utteranceRef.current.onend = () => setIsPlaying(false); // Set playing state to false when speech ends
        utteranceRef.current.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            setIsPlaying(false);
        };

        synth.speak(utteranceRef.current);
        setIsPlaying(true);
    }, [synth, currentSpeed, pitch, volume, selectedVoice]);

    // Function to pause speech
    const pauseSpeech = useCallback(() => {
        if (synth.speaking && !synth.paused) {
            synth.pause();
            setIsPlaying(false);
        }
    }, [synth]);

    // Function to resume speech
    const resumeSpeech = useCallback(() => {
        if (synth.paused) {
            synth.resume();
            setIsPlaying(true);
        }
    }, [synth]);

    // Effect to populate voices and set default voice
    useEffect(() => {
        const populateVoiceList = () => {
            const voices = synth.getVoices();
            setAvailableVoices(voices);
            // Try to set a default English US voice, fallback to any English, then first available
            const defaultVoice = voices.find(voice => voice.lang === 'en-US' && voice.name.includes('Google')) ||
                voices.find(voice => voice.lang.startsWith('en-')) ||
                voices[0];
            if (defaultVoice) {
                setSelectedVoice(defaultVoice);
            }
        };

        // Listen for voices being loaded
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = populateVoiceList;
        }
        populateVoiceList(); // Call immediately in case voices are already loaded
    }, [synth]);

    // Effect to clean up speech synthesis on unmount
    useEffect(() => {
        return () => {
            if (synth.speaking) {
                synth.cancel();
            }
        };
    }, [synth]);

    // Effect to handle reading file content and apply search highlighting
    useEffect(() => {
        if (file) {
            if (file.type === 'text/plain') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target.result;
                    setFileTextContent(content);
                    setReadingMessage(''); // Clear any previous reading message
                };
                reader.onerror = () => {
                    const msg = `Failed to read text file: ${file.name}.`;
                    setReadingMessage(msg);
                    setFileTextContent('');
                    console.error(msg);
                };
                reader.readAsText(file);
            } else {
                const msg = `Displaying: ${file.name}. Actual file content parsing for ${file.type} is not supported in this demo due to browser limitations on parsing uploaded files.`;
                setReadingMessage(msg);
                setFileTextContent(''); // Clear any previous text content
            }
        }
    }, [file]); // Re-run when file changes

    // Effect to apply search highlighting to displayed content
    useEffect(() => {
        if (fileTextContent && searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            const highlighted = fileTextContent.split(regex).map((part, index) =>
                regex.test(part) ? (
                    <span key={index} className="bg-yellow-300 rounded px-0.5">
                        {part}
                    </span>
                ) : (
                    part
                )
            );
            setDisplayedContent(highlighted);
        } else if (fileTextContent) {
            setDisplayedContent(fileTextContent); // Show original content if no search term
        } else {
            setDisplayedContent(''); // Clear if no file content
        }
    }, [fileTextContent, searchTerm]);


    // Button Click Handlers
    const handleBackButtonClick = () => {
        console.log('Back button clicked');
        if (synth.speaking) synth.cancel(); // Stop speech when closing
        if (onClose) onClose(); // Use the onClose prop to go back to the previous view
    };

    const handleAIIconClick = () => {
        console.log('AI icon clicked');
        setIsSidePanelLeftOpen(prev => !prev); // Toggle left side panel
        setIsSidePanelRightOpen(false); // Close right panel if left opens
        setActiveRightPanel(null); // No right panel active
    };

    const handleFileNameClick = () => {
        console.log('File name clicked');
        // In a real app, this might open a table of contents or file details
    };

    const handleSearchClick = () => {
        console.log('Search button clicked');
        setIsSidePanelRightOpen(prev => !prev || activeRightPanel !== 'search'); // Toggle or open if not search
        setActiveRightPanel('search'); // Set active right panel to search
        setIsSidePanelLeftOpen(false); // Close left panel
    };

    const handleSettingsClick = () => {
        console.log('Settings button clicked');
        setIsSidePanelRightOpen(prev => !prev || activeRightPanel !== 'settings'); // Toggle or open if not settings
        setActiveRightPanel('settings'); // Set active right panel to settings
        setIsSidePanelLeftOpen(false); // Close left panel
    };

    const handleRewindClick = () => {
        console.log('Rewind clicked');
        // In a real app, this would seek backward in the audio
    };

    const handlePlayPauseClick = () => {
        console.log('Play/Pause clicked. Current state:', isPlaying ? 'Playing' : 'Paused');
        if (isPlaying) {
            pauseSpeech();
        } else {
            let textToRead = '';
            if (fileTextContent) {
                textToRead = fileTextContent;
            } else if (readingMessage) {
                textToRead = readingMessage; // Read the warning message if no content
            } else {
                textToRead = `No content available for file: ${file ? file.name : 'Unknown File'}.`;
            }
            speakText(textToRead);
        }
    };

    const handleForwardClick = () => {
        console.log('Forward clicked');
        // In a real app, this would seek forward in the audio
    };

    const handleChangeSpeedClick = () => {
        setCurrentSpeed(prevSpeed => {
            let newSpeed = prevSpeed + 0.25;
            if (newSpeed > 2.0) { // Cycle speeds: 1.0x, 1.25x, 1.5x, 1.75x, 2.0x, then back to 1.0x
                newSpeed = 1.0;
            }
            console.log('Changed speed to:', newSpeed);
            if (utteranceRef.current) {
                utteranceRef.current.rate = newSpeed; // Update speed for current utterance
                // No need to cancel and re-speak, rate change applies dynamically if speaking
            }
            return newSpeed;
        });
    };

    const handleAutoscrollClick = () => {
        console.log('Autoscroll clicked');
        setIsAutoscrollActive(prev => !prev); // Toggle autoscroll state
        // In a real app, this would control automatic scrolling of text during playback
    };

    const handleZoomInClick = () => {
        setFontSizeScale(prevScale => Math.min(prevScale + 0.1, 1.5)); // Increase font size, max 1.5x
        console.log('Zoom In. New font size scale:', fontSizeScale + 0.1);
    };

    const handleZoomOutClick = () => {
        setFontSizeScale(prevScale => Math.max(prevScale - 0.1, 0.8)); // Decrease font size, min 0.8x
        console.log('Zoom Out. New font size scale:', fontSizeScale - 0.1);
    };

    const handleInfoClick = () => {
        console.log('Info clicked');
        // In a real app, this might show document info
    };

    const handleVoiceChange = (e) => {
        const voiceName = e.target.value;
        const voice = availableVoices.find(v => v.name === voiceName);
        if (voice) {
            setSelectedVoice(voice);
        }
    };

    const handlePitchChange = (e) => {
        const newPitch = parseFloat(e.target.value);
        setPitch(newPitch);
        if (utteranceRef.current) {
            utteranceRef.current.pitch = newPitch;
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (utteranceRef.current) {
            utteranceRef.current.volume = newVolume;
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        // The outermost container equivalent to <div id="__next">
        <div className={`relative flex flex-col flex-grow overflow-hidden ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
            {/* Aria Live Assertion - for screen readers, usually for toasts/notifications */}
            <div aria-live="assertive" className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-[9999]">
                <div className="flex w-full flex-col items-center space-y-4"></div>
            </div>

            {/* Hidden div for accessibility (aria-live region) */}
            <div className="absolute w-[1px] h-[1px] p-0 m-[-1px] overflow-hidden clip-rect-0 whitespace-nowrap border-0 hidden"></div>

            {/* Main Reader Container */}
            <div data-testid="reader-based-listening-experience" className="opacity-1 transition-opacity duration-300" style={{ opacity: 1, transition: 'opacity 0.3s' }}>
                <div className={`h-[100dvh] w-full overflow-hidden relative ${isDarkMode ? '!bg-gray-800' : '!bg-white'}`}>
                    {/* Top Navigation Bar - Occupies full width */}
                    <nav className={`border-b border-gray-200 fixed flex z-40 h-[53px] w-full opacity-1 transition-opacity duration-300 pointer-events-auto ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}>
                        <div className="w-[95%] min-w-auto h-full flex items-center justify-between bg-white relative right-[5rem]"> 
                            {/* Left Group of Buttons */}
                            <div className="px-1 py-2 flex items-center gap-3 flex-shrink-0">
                                <button
                                    className={`rounded-full focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#1D76ED] p-1 ${isDarkMode ? 'text-gray-200 hover:bg-gray-700 active:bg-gray-600' : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200'}`}
                                    onClick={handleBackButtonClick}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M16.207 19.708a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.415l7-7a1 1 0 011.414 1.414L9.914 12l6.293 6.293a1 1 0 010 1.415z" fill="currentColor"></path>
                                    </svg>
                                </button>
                                <div className={`w-[2px] h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                                <button
                                    className={`rounded-full focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#1D76ED] p-0 ${isDarkMode ? 'text-gray-200 hover:bg-gray-700 active:bg-gray-600' : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200'}`}
                                    onClick={handleAIIconClick}
                                >
                                    <div className="h-8 w-8 relative flex items-center justify-center">
                                        {/* Complex AI Icon SVG - retaining inline styles for gradients/filters */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none"
                                            className="absolute h-[33px] w-[33px] text-gray-800 [&_#i-icon-gradient-opacity-0]:opacity-30, [&_##ai-icon-gradient-1]:opacity-60 [&_#ai-icon-gradient-0]:fill-[url(#ai_icon_light_gradient_0)] dark:[&_#ai-icon-gradient-0]:fill-[url(#ai_icon_dark_gradient_0)] [&_#ai-icon-gradient-1]:fill-[url(#ai_icon_light_gradient_1)] dark:[&_#ai-icon-gradient-1]:fill-[url(#ai_icon_dark_gradient_1)] [&_#ai-icon-gradient-0]:hover:fill-none [&_#ai-icon-gradient-0]:active:fill-none dark:[&_#ai-icon-gradient-0]:hover:fill-none dark:[&_#ai-icon-gradient-0]:active:fill-none [&_#ai-icon-gradient-1]:hover:fill-none [&_#ai-icon-gradient-1]:active:fill-none dark:[&_#ai-icon-gradient-1]:hover:fill-none dark:[&_#ai-icon-gradient-1]:active:fill-none">
                                            <g id="ai-icon-gradient-opacity-0" filter="url(#filter0_f_3368_6978)">
                                                <path id="ai-icon-gradient-0" fillRule="evenodd" clipRule="evenodd" d="M27.2753 8.70364L28.6878 7.28769C30.5529 9.14821 30.6838 11.0876 30.837 13.358C30.8426 13.4405 30.8482 13.5235 30.8539 13.6069C30.9418 14.8907 31 16.3598 31 18C31 19.5456 30.9483 20.9392 30.8688 22.1689C30.8627 22.2633 30.8568 22.3572 30.8508 22.4505C30.7014 24.8027 30.5737 26.8136 28.7085 28.6835C26.8431 30.5534 24.822 30.6868 22.458 30.8428C22.3631 30.8491 22.2676 30.8554 22.1715 30.8618C20.9298 30.9452 19.5314 31 18 31C16.4686 31 15.0702 30.9452 13.8285 30.8618C13.7324 30.8554 13.6369 30.8491 13.542 30.8428C11.178 30.6868 9.15687 30.5534 7.29152 28.6835C5.42632 26.8136 5.29858 24.8027 5.14918 22.4505C5.14325 22.3572 5.13729 22.2633 5.13118 22.1689C5.05165 20.9392 5 19.5456 5 18C5 16.3598 5.05817 14.8907 5.14611 13.6069C5.15182 13.5235 5.15742 13.4405 5.16299 13.358C5.31624 11.0876 5.44715 9.14821 7.31225 7.28769L8.72472 8.70364C7.39587 10.0292 7.31105 11.2674 7.14143 13.7436C7.05649 14.9836 7 16.407 7 18C7 19.501 7.05016 20.8515 7.12701 22.0398C7.29515 24.6396 7.37922 25.9394 8.70749 27.271C10.0358 28.6026 11.3447 28.6905 13.9625 28.8663C15.1626 28.9469 16.5161 29 18 29C19.4839 29 20.8374 28.9469 22.0375 28.8663C24.6553 28.6905 25.9642 28.6026 27.2925 27.271C28.6208 25.9394 28.7049 24.6396 28.873 22.0398C28.9498 20.8515 29 19.501 29 18C29 16.407 28.9435 14.9836 28.8586 13.7436C28.6889 11.2674 28.6041 10.0292 27.2753 8.70364Z"></path>
                                            </g>
                                            <g id="ai-icon-gradient-opacity-1" filter="url(#filter1_f_3368_6978)">
                                                <path id="ai-icon-gradient-1" fillRule="evenodd" clipRule="evenodd" d="M27.2753 8.70364L28.6878 7.28769C30.5529 9.14821 30.6838 11.0876 30.837 13.358C30.8426 13.4405 30.8482 13.5235 30.8539 13.6069C30.9418 14.8907 31 16.3598 31 18C31 19.5456 30.9483 20.9392 30.8688 22.1689C30.8627 22.2633 30.8568 22.3572 30.8508 22.4505C30.7014 24.8027 30.5737 26.8136 28.7085 28.6835C26.8431 30.5534 24.822 30.6868 22.458 30.8428C22.3631 30.8491 22.2676 30.8554 22.1715 30.8618C20.9298 30.9452 19.5314 31 18 31C16.4686 31 15.0702 30.9452 13.8285 30.8618C13.7324 30.8554 13.6369 30.8491 13.542 30.8428C11.178 30.6868 9.15687 30.5534 7.29152 28.6835C5.42632 26.8136 5.29858 24.8027 5.14918 22.4505C5.14325 22.3572 5.13729 22.2633 5.13118 22.1689C5.05165 20.9392 5 19.5456 5 18C5 16.3598 5.05817 14.8907 5.14611 13.6069C5.15182 13.5235 5.15742 13.4405 5.16299 13.358C5.31624 11.0876 5.44715 9.14821 7.31225 7.28769L8.72472 8.70364C7.39587 10.0292 7.31105 11.2674 7.14143 13.7436C7.05649 14.9836 7 16.407 7 18C7 19.501 7.05016 20.8515 7.12701 22.0398C7.29515 24.6396 7.37922 25.9394 8.70749 27.271C10.0358 28.6026 11.3447 28.6905 13.9625 28.8663C15.1626 28.9469 16.5161 29 18 29C19.4839 29 20.8374 28.9469 22.0375 28.8663C24.6553 28.6905 25.9642 28.6026 27.2925 27.271C28.6208 25.9394 28.7049 24.6396 28.873 22.0398C28.9498 20.8515 29 19.501 29 18C29 16.407 28.9435 14.9836 28.8586 13.7436C28.6889 11.2674 28.6041 10.0292 27.2753 8.70364Z"></path>
                                            </g>
                                            <path d="M22.8117 13.9C22.8117 13.4029 22.4088 13 21.9117 13C21.4147 13 21.0117 13.4029 21.0117 13.9L21.0117 21.9C21.0117 22.3971 21.4147 22.8 21.9117 22.8C22.4088 22.8 22.8117 22.3971 22.8117 21.9V13.9Z" fill="currentColor"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M18.0413 22.1531L17.6279 20.9131H14.1031C14.0598 20.9131 14.0173 20.9096 13.9759 20.903L13.5592 22.1531C13.4194 22.5723 12.9664 22.7988 12.5472 22.6591C12.1281 22.5194 11.9016 22.0663 12.0413 21.6472L14.5669 14.0702C14.962 12.885 16.6384 12.885 17.0335 14.0702L19.5592 21.6472C19.6989 22.0663 19.4724 22.5194 19.0532 22.6591C18.634 22.7988 18.181 22.5723 18.0413 22.1531ZM15.8002 15.43L17.0946 19.3131H14.5058L15.8002 15.43Z" fill="currentColor"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.14143 13.7436C7.31105 11.2674 7.39587 10.0292 8.72472 8.70364C10.0536 7.37805 11.2825 7.29691 13.7402 7.13462C14.969 7.05349 16.3897 7 18 7C19.6103 7 21.031 7.05349 22.2598 7.13462C24.7176 7.29691 25.9464 7.37805 27.2753 8.70364C28.6041 10.0292 28.6889 11.2674 28.8586 13.7436C28.9435 14.9836 29 16.407 29 18C29 19.501 28.9498 20.8515 28.873 22.0398C28.7049 24.6396 28.6208 25.9394 27.2925 27.271C25.9642 28.6026 24.6553 28.6905 22.0375 28.8663C20.8374 28.9469 19.4839 29 18 29C16.5161 29 15.1626 28.9469 13.9625 28.8663C11.3447 28.6905 10.0358 28.6026 8.70749 27.271C7.37921 25.9394 7.29515 24.6396 7.12701 22.0398C7.05016 20.8515 7 19.501 7 18C7 16.407 7.05649 14.9836 7.14143 13.7436ZM21.9035 26.8708C20.745 26.9486 19.4363 27 18 27C16.5637 27 15.255 26.9486 14.0965 26.8708C11.3488 26.6863 10.8397 26.5766 10.1235 25.8586C9.40611 25.1394 9.29911 24.6362 9.12284 21.9108C9.04867 20.7639 9 19.4565 9 18C9 16.4543 9.05482 15.0765 9.13676 13.8803C9.3131 11.306 9.41238 10.8426 10.1372 10.1196C10.8632 9.39534 11.3207 9.29874 13.872 9.13028C15.0572 9.05201 16.434 9 18 9C19.566 9 20.9428 9.05201 22.128 9.13028C24.6793 9.29874 25.1368 9.39534 25.8628 10.1196C26.5876 10.8426 26.6869 11.306 26.8632 13.8803C26.9452 15.0765 27.0001 16.4543 27.0001 18C27.0001 19.4565 26.9513 20.7639 26.8772 21.9108C26.7009 24.6362 26.5939 25.1394 25.8765 25.8586C25.1603 26.5766 24.6512 26.6863 21.9035 26.8708Z" fill="currentColor"></path>
                                            <defs>
                                                <filter id="filter0_f_3368_6978" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                                    <feGaussianBlur stdDeviation="2.5" result="effect1_foregroundBlur_3368_6978"></feGaussianBlur>
                                                </filter>
                                                <filter id="filter1_f_3368_6978" x="2" y="2" width="32" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                                    <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_3368_6978"></feGaussianBlur>
                                                </filter>
                                                <radialGradient id="ai_icon_light_gradient_0" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.24763 7.16667) rotate(43.9734) scale(36.8791 36.8624)">
                                                    <stop stopColor="#E09DFF"></stop>
                                                    <stop offset="0.435189" stopColor="#9FA4FF"></stop>
                                                    <stop offset="1" stopColor="#71DFFF"></stop>
                                                </radialGradient>
                                                <radialGradient id="ai_icon_light_gradient_1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.24762 7.16667) rotate(41.8593) scale(31.2202 31.206)">
                                                    <stop stopColor="#FF00E5"></stop>
                                                    <stop offset="1" stopColor="#0094FF"></stop>
                                                </radialGradient>
                                                <radialGradient id="ai_icon_dark_gradient_0" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.24769 7.16667) rotate(43.9734) scale(36.8791 36.8624)">
                                                    <stop stopColor="#E09DFF"></stop>
                                                    <stop offset="0.435189" stopColor="#9FA4FF"></stop>
                                                    <stop offset="1" stopColor="#71DFFF"></stop>
                                                </radialGradient>
                                                <radialGradient id="ai_icon_dark_gradient_1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.24762 7.16667) rotate(41.8593) scale(31.2202 31.206)">
                                                    <stop stopColor="#FF00E5"></stop>
                                                    <stop offset="1" stopColor="#0094FF"></stop>
                                                </radialGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </button>
                            </div>

                            {/* Center File Name Button - Now uses flex-1 for responsive width */}
                            <div className="flex-1 flex items-center justify-center min-w-0 px-2 sm:px-4">
                                <button
                                    className={`text-lg relative flex items-center justify-center rounded-lg py-2 px-3 pointer-events-auto cursor-pointer focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#1D76ED] w-fit text-center max-w-full ${isDarkMode ? 'text-gray-200 hover:bg-gray-700 active:bg-gray-600' : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200'}`}
                                    onClick={handleFileNameClick}
                                >
                                    <div className="text-ellipsis whitespace-nowrap overflow-hidden">{file ? file.name : 'Unknown File'}</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="w-4 h-4 ml-1 flex-shrink-0">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.197 5.136a.75.75 0 010 1.06L8.53 10.865a.75.75 0 01-1.06 0L2.802 6.197a.75.75 0 111.06-1.06L8 9.272l4.136-4.137a.75.75 0 011.061 0z" fill="currentColor"></path>
                                    </svg>
                                </button>
                            </div>

                            {/* Right Group of Buttons */}
                            <div className="px-1 py-2 flex justify-end gap-3 items-center flex-shrink-0">
                                <button
                                    className={`rounded-full focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#1D76ED] p-1 ${isDarkMode ? 'text-gray-200 hover:bg-gray-700 active:bg-gray-600' : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200'}`}
                                    onClick={handleSearchClick}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.762 17.176a8.5 8.5 0 111.414-1.414l4.031 4.03a1 1 0 01-1.414 1.414l-4.03-4.03zM17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" fill="currentColor"></path>
                                    </svg>
                                </button>
                                <button
                                    className={`rounded-full focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#1D76ED] p-1 ${isDarkMode ? 'text-gray-200 hover:bg-gray-700 active:bg-gray-600' : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200'} mr-1`}
                                    onClick={handleSettingsClick}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.713 3.007h-1.688a.461.461 0 00-.447.349 4.461 4.461 0 01-5.55 3.204.461.461 0 00-.525.213l-.844 1.461a.461.461 0 00.078.562 4.461 4.461 0 010 6.408.461.461 0 00-.078.562l.844 1.462c.105.183.322.27.526.213a4.461 4.461 0 015.549 3.204.461.461 0 00.447.348h1.688a.461.461 0 00.447-.348 4.461 4.461 0 015.55-3.204c.203.058.42-.03.526-.213l.844-1.462a.461.461 0 00-.079-.562 4.461 4.461 0 010-6.408.461.461 0 00.079-.562l-.844-1.461a.461.461 0 00-.526-.213 4.461 4.461 0 01-5.55-3.204.461.461 0 00-.447-.35zm-7.136 1.63A2.461 2.461 0 002.77 5.772l-.844 1.461a2.461 2.461 0 00.419 2.999 2.461 2.461 0 010 3.535 2.461 2.461 0 00-.42 2.998l.845 1.462a2.461 2.461 0 002.806 1.136 2.461 2.461 0 013.061 1.768 2.461 2.461 0 002.387 1.861h1.688a2.461 2.461 0 002.387-1.861 2.461 2.461 0 013.062-1.768 2.461 2.461 0 002.806-1.136l.844-1.462a2.461 2.461 0 00-.42-2.998 2.461 2.461 0 010-3.535c.811-.786.984-2.021.42-2.999l-.844-1.461a2.461 2.461 0 00-2.806-1.137A2.461 2.461 0 0115.1 2.87a2.461 2.461 0 00-2.387-1.862h-1.688a2.461 2.461 0 00-2.387 1.862 2.461 2.461 0 01-3.061 1.767z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.869 14.056a2.056 2.056 0 100-4.112 2.056 2.056 0 000 4.112zm0 2a4.056 4.056 0 100-8.112 4.056 4.056 0 000 8.112z" fill="currentColor"></path>
                                    </svg>
                                </button>
                                {/* Close Button */}
                                {onClose && (
                                    <button
                                        className={`rounded-full focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#1D76ED] p-1 ${isDarkMode ? 'text-gray-200 hover:bg-gray-700 active:bg-gray-600' : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200'}`}
                                        onClick={handleBackButtonClick}
                                        aria-label="Close Reader"
                                    >
                                        <IoClose className="h-6 w-6" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </nav>

                    {/* Main content area below nav - This is the flex container */}
                    <div className="flex flex-row flex-grow h-full pt-[53px] relative"> {/* pt-[53px] to clear the fixed nav */}

                        {/* Left Side Panel */}
                        <div
                            ref={leftPanelRef}
                            className={`absolute top-0 bottom-0 left-0 w-[400px] z-20 shadow-lg transition-transform duration-300 ease-in-out ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}
                            style={{ transform: getPanelTransform(isSidePanelLeftOpen, 'left'), opacity: isSidePanelLeftOpen ? 1 : 0, pointerEvents: isSidePanelLeftOpen ? 'auto' : 'none' }}
                        >
                            <div className="p-4 pt-16"> {/* Add padding top to avoid overlap with nav */}
                                <h2 className="text-xl font-bold mb-4">AI Features Panel</h2>
                                <div className="space-y-4">
                                    <p>Unlock smart reading with AI! This panel would offer features like:</p>
                                    <ul className="list-disc list-inside ml-4 space-y-2">
                                        <li>Summarize document content</li>
                                        <li>Ask questions about the text</li>
                                        <li>Translate selected passages</li>
                                        <li>Generate new content based on the document</li>
                                        <li>Personalized reading recommendations</li>
                                    </ul>
                                    <p className="text-sm text-gray-500 mt-4">
                                        Activate AI insights by clicking the AI icon in the top left navigation bar.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Central Content Area - Dynamically adjusts margins */}
                        <div
                            className="flex-grow overflow-y-auto w-full transition-[margin] duration-300 ease-in-out"
                            style={{
                                marginLeft: isSidePanelLeftOpen ? `${panelWidth}px` : '0px',
                                marginRight: isSidePanelRightOpen ? `${panelWidth}px` : '0px',
                            }}
                        >
                            <div className={`webreader classic-reader reader-api-based relative text-base flex flex-col items-center py-12 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                <div className={`w-full md:w-[min(100%,768px)] px-8 md:px-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                    {/* Display file content or message */}
                                    {fileTextContent ? (
                                        <pre
                                            className={`whitespace-pre-wrap text-base overflow-auto p-4 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-gray-50 text-gray-800 border-gray-200'}`}
                                            style={{ fontSize: `${16 * fontSizeScale}px` }}
                                        >
                                            {displayedContent}
                                        </pre>
                                    ) : (
                                        <section className="text-center py-12">
                                            <p className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontSize: `${20 * fontSizeScale}px` }}>
                                                {readingMessage || (file ? `Displaying: ${file.name}` : 'No file selected.')}
                                            </p>
                                            {file && file.type !== 'text/plain' && (
                                                <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontSize: `${18 * fontSizeScale}px` }}>
                                                    Actual file content parsing for {file.type} is not supported in this demo due to browser security limitations and the complexity of parsing various document formats.
                                                </p>
                                            )}
                                            <p className={`mt-2 text-md ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`} style={{ fontSize: `${16 * fontSizeScale}px` }}>
                                                Click the play button below to hear the file name or explanatory message read aloud.
                                            </p>
                                        </section>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Side Panel */}
                        <div
                            ref={rightPanelRef}
                            className={`absolute top-0 bottom-0 right-0 w-[400px] z-20 shadow-lg transition-transform duration-300 ease-in-out ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}
                            style={{ transform: getPanelTransform(isSidePanelRightOpen, 'right'), opacity: isSidePanelRightOpen ? 1 : 0, pointerEvents: isSidePanelRightOpen ? 'auto' : 'none' }}
                        >
                            {activeRightPanel === 'search' && (
                                <div className="p-4 pt-16"> {/* Add padding top to avoid overlap with nav */}
                                    <h2 className="text-xl font-bold mb-4">Search Document</h2>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <input
                                            type="text"
                                            placeholder="Search text..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className={`flex-1 p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' : 'bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500'}`}
                                        />
                                        <button
                                            onClick={() => setSearchTerm('')} // Clear search term
                                            className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Enter text to highlight occurrences in the document.
                                    </p>
                                    <div className="mt-4 space-y-2">
                                        <p>For this demo, the search will highlight text within a plain text file. Full document parsing for other file types is not supported.</p>
                                    </div>
                                </div>
                            )}

                            {activeRightPanel === 'settings' && (
                                <div className="p-4 pt-16"> {/* Add padding top to avoid overlap with nav */}
                                    <h2 className="text-xl font-bold mb-4">Settings</h2>
                                    <div className="space-y-6">
                                        {/* Dark/Light Mode */}
                                        <div>
                                            <label htmlFor="darkModeToggle" className="block text-lg font-medium mb-2">Dark Mode</label>
                                            <button
                                                id="darkModeToggle"
                                                onClick={toggleDarkMode}
                                                className={`w-20 h-10 rounded-full flex items-center transition-colors duration-300 ${isDarkMode ? 'bg-blue-600 justify-end' : 'bg-gray-200 justify-start'}`}
                                            >
                                                <span className={`h-8 w-8 rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-10' : 'translate-x-1'} ${isDarkMode ? 'bg-white' : 'bg-white'}`}></span>
                                            </button>
                                        </div>

                                        {/* Voice Selection */}
                                        <div>
                                            <label htmlFor="voiceSelect" className="block text-lg font-medium mb-2">Voice</label>
                                            <select
                                                id="voiceSelect"
                                                onChange={handleVoiceChange}
                                                value={selectedVoice ? selectedVoice.name : ''}
                                                className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
                                            >
                                                {availableVoices.length > 0 ? (
                                                    availableVoices.map(voice => (
                                                        <option key={voice.name} value={voice.name}>
                                                            {voice.name} ({voice.lang})
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="">Loading voices...</option>
                                                )}
                                            </select>
                                        </div>

                                        {/* Pitch Control */}
                                        <div>
                                            <label htmlFor="pitchSlider" className="block text-lg font-medium mb-2">Pitch ({pitch.toFixed(1)})</label>
                                            <input
                                                type="range"
                                                id="pitchSlider"
                                                min="0.5"
                                                max="2"
                                                step="0.1"
                                                value={pitch}
                                                onChange={handlePitchChange}
                                                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-700 [&::-webkit-slider-thumb]:rounded-full"
                                            />
                                        </div>

                                        {/* Volume Control */}
                                        <div>
                                            <label htmlFor="volumeSlider" className="block text-lg font-medium mb-2">Volume ({volume.toFixed(1)})</label>
                                            <input
                                                type="range"
                                                id="volumeSlider"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={volume}
                                                onChange={handleVolumeChange}
                                                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-700 [&::-webkit-slider-thumb]:rounded-full"
                                            />
                                        </div>

                                        {/* Speed Control (existing button is on main player, can add a slider here too for granularity) */}
                                        <div>
                                            <label htmlFor="speedDisplay" className="block text-lg font-medium mb-2">Speed ({currentSpeed.toFixed(2)}x)</label>
                                            <input
                                                type="range"
                                                id="speedDisplay"
                                                min="0.5"
                                                max="2.0"
                                                step="0.25"
                                                value={currentSpeed}
                                                onChange={(e) => {
                                                    const newSpeed = parseFloat(e.target.value);
                                                    setCurrentSpeed(newSpeed);
                                                    if (utteranceRef.current) {
                                                        utteranceRef.current.rate = newSpeed;
                                                    }
                                                }}
                                                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-700 [&::-webkit-slider-thumb]:rounded-full"
                                            />
                                            <p className="text-sm text-gray-500 mt-1">
                                                Use the button on the player for quick cycle through speeds.
                                            </p>
                                        </div>

                                        {/* Autoscroll Toggle */}
                                        <div>
                                            <label htmlFor="autoscrollToggle" className="block text-lg font-medium mb-2">Autoscroll</label>
                                            <button
                                                id="autoscrollToggle"
                                                onClick={handleAutoscrollClick}
                                                className={`w-20 h-10 rounded-full flex items-center transition-colors duration-300 ${isAutoscrollActive ? 'bg-blue-600 justify-end' : 'bg-gray-200 justify-start'}`}
                                            >
                                                <span className={`h-8 w-8 rounded-full shadow-md transform transition-transform duration-300 ${isAutoscrollActive ? 'translate-x-10' : 'translate-x-1'} ${isAutoscrollActive ? 'bg-white' : 'bg-white'}`}></span>
                                            </button>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Automatically scroll content during playback.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div> {/* End of flex container for main content area */}

                    {/* Bottom Player Bar - Fixed at the very bottom, over everything */}
                    <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6 z-30 pointer-events-none">
                        <div ref={playerRef} id="speechify-web-player" className="w-full flex flex-col relative pointer-events-auto rounded-3xl max-w-sm shadow-xl z-20 mx-4">
                            {/* Background div that transitions height */}
                            <div className={`absolute w-full z-10 bottom-0 h-full pb-[72px] overflow-hidden ease-in-out min-h-0 rounded-3xl ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ transition: 'min-height 300ms', minHeight: '100px' }}></div> {/* Removed isPlayerOpen, keeping it always open for simplicity */}

                            {/* Player Controls Content */}
                            <div className={`px-3 relative flex flex-col py-2.5 z-20 transition-all duration-150 ease-in-out h-[100px] rounded-3xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                {/* Progress Bar */}
                                <div className="no-drag transition-opacity duration-150 ease-in-out opacity-100 delay-200">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        aria-label="Player progress"
                                        value={0} // Temporarily fixed, update with actual progress
                                        onChange={(e) => console.log('Progress changed:', e.target.value)}
                                        className="w-full h-1 bg-blue-500 rounded-lg appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-700 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
                                    />
                                </div>
                                {/* Timestamps */}
                                <div className="flex mt-1 justify-between transition-opacity ease-in-out opacity-100 delay-200 duration-0">
                                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentTime}</span>
                                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{totalTime}</span>
                                </div>

                                {/* Playback Controls Row */}
                                <div className="flex w-full justify-between items-center absolute bottom-3 left-0 px-3">
                                    {/* Voice Selector / Speaker Info */}
                                    <div className="relative size-[42px]">
                                        <div className="absolute top-[-0.5rem] left-[20px]">
                                            {/* Tooltip (hidden by default) */}
                                            <div className={`z-10 absolute top-0 left-0 px-2 py-2 rounded-2xl border shadow-md flex transition-all duration-300 ease-in-out opacity-0 translate-y-2 pointer-events-none ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-200'}`} style={{ transform: 'translate(-50%, -100%) translateY(8px)' }}>
                                                <div className="flex relative group flex-col w-[5rem] h-[5rem] items-center gap-1">
                                                    <button className="rounded-full bg-gray-300 relative w-10 h-10">
                                                        <img src="https://vms.cdn.speechify.com/avatars/d1bc3bef-b25e-453b-8403-6dae96a96446.webp" className="w-full h-full rounded-full object-cover hover:opacity-75 player-voice-selector-tooltip" alt="Speaker" />
                                                        <div className="absolute bottom-0 -right-1">
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g clipPath="url(#clip0_737_23957)">
                                                                    <rect width="16" height="16" rx="8" className="fill-white"></rect>
                                                                    <path d="M7.2 5.5V7H8.8V5.5C8.8 5.05817 8.44183 4.7 8 4.7C7.55817 4.7 7.2 5.05817 7.2 5.5Z" className="fill-gray-800"></path>
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.7 7H6V5.5C6 4.39543 6.89543 3.5 8 3.5C9.10457 3.5 10 4.39543 10 5.5V7H10.3C10.9627 7 11.5 7.53726 11.5 8.2V10.7371C11.5 11.3999 10.9627 11.9371 10.3 11.9371H5.7C5.03726 11.9371 4.5 11.3999 4.5 10.7371V8.2C4.5 7.53726 5.03726 7 5.7 7Z" className="fill-gray-800"></path>
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_737_23957">
                                                                        <rect width="16" height="16" rx="8" className="fill-white"></rect>
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </div>
                                                    </button>
                                                    <div className="flex flex-col items-center text-center">
                                                        <div className={`text-sm whitespace-nowrap overflow-hidden line-clamp-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Henry</div>
                                                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>US</div>
                                                    </div>
                                                </div>
                                                <div className={`absolute bottom-0 left-1/2 w-2.5 h-2.5 border-b border-r rotate-45 transform -translate-y-1/2 -translate-x-1/2 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-200'}`}></div>
                                            </div>
                                        </div>
                                        <button className={`rounded-full no-drag w-10 h-10 overflow-hidden relative before:content-[''] before:absolute before:inset-0 before:rounded-full before:transition-all hover:opacity-75 active:opacity-50 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                            <img src="https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/gb.svg" className="w-10 h-10 rounded-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="UK Flag" />
                                        </button>
                                    </div>

                                    {/* Main Playback Buttons */}
                                    <div className="flex gap-2 items-center">
                                        <button className={`p-1.5 hover:opacity-75 active:opacity-50 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`} onClick={handleRewindClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M17.4079 10.1148C17.4079 6.41453 14.4082 3.41484 10.7079 3.41484C8.27684 3.41484 6.14679 4.70984 4.97232 6.64948H7.14542C7.58724 6.64948 7.94542 7.00765 7.94542 7.44948C7.94542 7.8913 7.58724 8.24948 7.14542 8.24948H2.97875C2.53692 8.24948 2.17875 7.8913 2.17875 7.44948V3.28281C2.17875 2.84098 2.53692 2.48281 2.97875 2.48281C3.42058 2.48281 3.77875 2.84098 3.77875 3.28281V5.54441C5.26344 3.29792 7.81182 1.81484 10.7079 1.81484C15.2919 1.81484 19.0079 5.53088 19.0079 10.1148C19.0079 13.3081 17.2044 16.0789 14.5641 17.4664C14.1729 17.6719 13.6893 17.5215 13.4837 17.1304C13.2782 16.7393 13.4286 16.2556 13.8198 16.0501C15.9547 14.9281 17.4079 12.6905 17.4079 10.1148Z" fill="currentColor"></path>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.93858 14.4742C5.93858 16.7789 7.09581 18.1852 8.96104 18.1852C10.8263 18.1852 11.9786 16.7691 11.9786 14.4693C11.9786 12.1549 10.8165 10.7828 8.96104 10.7828C7.11045 10.7828 5.93858 12.1598 5.93858 14.4742ZM10.1573 14.4742C10.1573 16.0123 9.70811 16.7887 8.96104 16.7887C8.21885 16.7887 7.75987 16.0123 7.75987 14.4693C7.75987 12.9361 8.21885 12.1793 8.96104 12.1793C9.70323 12.1793 10.1573 12.9312 10.1573 14.4742Z" fill="currentColor"></path>
                                                <path d="M3.84366 18.1217C3.31143 18.1217 2.9501 17.775 2.9501 17.2379V12.5455H2.91592L2.03702 13.1559C1.87588 13.2682 1.76846 13.3072 1.59756 13.3072C1.25088 13.3072 0.992096 13.0484 0.992096 12.6871C0.992096 12.4283 1.09463 12.2281 1.34854 12.0523L2.68155 11.1441C3.05752 10.8902 3.36026 10.8512 3.71182 10.8512C4.35635 10.8512 4.73233 11.2369 4.73233 11.8521V17.2379C4.73233 17.775 4.37588 18.1217 3.84366 18.1217Z" fill="currentColor"></path>
                                            </svg>
                                        </button>
                                        <button className="relative w-fit rounded-full" onClick={handlePlayPauseClick}>
                                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="24" cy="24" r="24" fill="none" className="fill-blue-500 hover:fill-blue-600 active:fill-blue-700"></circle>
                                                <path fillRule="evenodd" clipRule="evenodd" d={
                                                    isPlaying
                                                        ? 'M19.5 16.5h-3a1 1 0 00-1 1v13a1 1 0 001 1h3a1 1 0 001-1v-13a1 1 0 00-1-1zm8 0h-3a1 1 0 00-1 1v13a1 1 0 001 1h3a1 1 0 001-1v-13a1 1 0 00-1-1z' // Pause icon paths
                                                        : 'M30.5905 20C29.2371 17.7751 26.7911 16.292 24.0001 16.292C19.7431 16.292 16.2921 19.743 16.2921 24C16.2921 28.257 19.7431 31.708 24.0001 31.708C27.9571 31.708 31.2189 28.7255 31.6578 24.8864C31.7205 24.3377 32.2162 23.9437 32.7649 24.0065C33.3136 24.0692 33.7076 24.5649 33.6449 25.1136C33.0918 29.9512 28.9854 33.708 24.0001 33.708C18.6385 33.708 14.2921 29.3616 14.2921 24C14.2921 18.6384 18.6385 14.292 24.0001 14.292C27.3206 14.292 30.2503 15.9592 32 18.499V16.5C32 15.9477 32.4477 15.5 33 15.5C33.5523 15.5 34 15.9477 34 16.5V21C34 21.5523 33.5523 22 33 22L28.5 22C27.9477 22 27.5 21.5523 27.5 21C27.5 20.4477 27.9477 20 28.5 20L30.5905 20Z' // Play icon path
                                                } fill="currentColor"></path>
                                            </svg>
                                        </button>
                                        <button className={`p-1.5 hover:opacity-75 active:opacity-50 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`} onClick={handleForwardClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M2.842 10.1148C2.842 6.41453 5.8417 3.41484 9.542 3.41484C11.9731 3.41484 14.1031 4.70984 15.2776 6.64948H13.1045C12.6627 6.64948 12.3045 7.00765 12.3045 7.44948C12.3045 7.8913 12.6627 8.24948 13.1045 8.24948H17.2712C17.713 8.24948 18.0712 7.8913 18.0712 7.44948V3.28281C18.0712 2.84098 17.713 2.48281 17.2712 2.48281C16.8293 2.48281 16.4712 2.84098 16.4712 3.28281V5.54441C14.9865 3.29792 12.4381 1.81484 9.542 1.81484C4.95804 1.81484 1.242 5.53088 1.242 10.1148C1.242 13.3081 3.04556 16.0789 5.68586 17.4664C6.07697 17.6719 6.56065 17.5215 6.76618 17.1304C6.97171 16.7393 6.82127 16.2556 6.43016 16.0501C4.29519 14.9281 2.842 12.6905 2.842 10.1148Z" fill="currentColor"></path>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.718 14.4742C12.718 16.7789 13.8752 18.1852 15.7404 18.1852C17.6057 18.1852 18.758 16.7691 18.758 14.4693C18.758 12.1549 17.5959 10.7828 15.7404 10.7828C13.8899 10.7828 12.718 12.1598 12.718 14.4742ZM16.9367 14.4742C16.9367 16.0123 16.4875 16.7887 15.7404 16.7887C14.9983 16.7887 14.5393 16.0123 14.5393 14.4693C14.5393 12.9361 14.9983 12.1793 15.7404 12.1793C16.4826 12.1793 16.9367 12.9312 16.9367 14.4742Z" fill="currentColor"></path>
                                                <path d="M10.6231 18.1217C10.0908 18.1217 9.7295 17.775 9.7295 17.2379V12.5455H9.69532L8.81642 13.1559C8.65528 13.2682 8.54786 13.3072 8.37696 13.3072C8.03028 13.3072 7.7715 13.0484 7.7715 12.6871C7.7715 12.4283 7.87403 12.2281 8.12794 12.0523L9.46095 11.1441C9.83693 10.8902 10.1397 10.8512 10.4912 10.8512C11.1358 10.8512 11.5117 11.2369 11.5117 11.8521V17.2379C11.5117 17.775 11.1553 18.1217 10.6231 18.1217Z" fill="currentColor"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <button className={`rounded-full no-drag hover:opacity-75 active:opacity-50 w-10 h-10 ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`} onClick={handleChangeSpeedClick}>
                                        <div className="text-base">{currentSpeed.toFixed(2)}<span className="text-lg">x</span></div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Resize Handle */}
                        <div className="absolute bottom-0 right-0 cursor-grab hover:opacity-75 focus:opacity-50" style={{ cursor: 'grab' }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                                <g id="move">
                                    <g id="icon">
                                        <rect id="Rectangle 2" x="12.5" y="12.5" width="2" height="2" rx="1" transform="rotate(-180 12.5 12.5)" fill="currentColor"></rect>
                                        <rect id="Rectangle 2_2" x="9" y="12.5" width="2" height="2" rx="1" transform="rotate(-180 9 12.5)" fill="currentColor"></rect>
                                        <rect id="Rectangle 3" x="12.5" y="9" width="2" height="2" rx="1" transform="rotate(-180 12.5 9)" fill="currentColor"></rect>
                                        <rect id="Rectangle 3_2" x="9" y="9" width="2" height="2" rx="1" transform="rotate(-180 9 9)" fill="currentColor"></rect>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>

                    {/* Auto-scroll Button - Adjusted class for conditional background */}
                    <button
                        className={`pointer-events-auto fixed bottom-[150px] right-4 z-30 p-1.5 overflow-hidden rounded-lg border cursor-pointer ${isAutoscrollActive ? 'bg-blue-200 border-blue-300' : (isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200')}`}
                        onClick={handleAutoscrollClick}
                    >
                        <div className="dark:[&_path]:stroke-white autoscroll-button relative w-full h-full flex flex-col items-center justify-center">
                            <div className="w-5 h-5">
                                {/* Lottie-like SVG - retaining original attributes */}
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', transform: 'translate3d(0px, 0px, 0px)', contentVisibility: 'visible' }}>
                                    <defs>
                                        <clipPath id="__lottie_element_218">
                                            <rect width="24" height="24" x="0" y="0"></rect>
                                        </clipPath>
                                    </defs>
                                    <g clipPath="url(#__lottie_element_218)">
                                        <g transform="matrix(1.100000023841858,0,0,1.100000023841858,0.18270015716552734,7.234114646911621)" opacity="1" style={{ display: 'block' }}>
                                            <g opacity="1" transform="matrix(1,0,0,1,10.743000030517578,7.619999885559082)">
                                                <path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(30,30,30)" strokeOpacity="1" strokeWidth="1.8" d=" M-6.243000030517578,-3.119999885559082 C-6.243000030517578,-3.119999885559082 0,3.119999885559082 0,3.119999885559082 C0,3.119999885559082 6.243000030517578,-3.119999885559082 6.243000030517578,-3.119999885559082"></path>
                                            </g>
                                        </g>
                                        <g transform="matrix(1.100000023841858,0,0,1.100000023841858,4.142699718475342,4.198516368865967)" opacity="0.5" style={{ display: 'block' }}>
                                            <g opacity="1" transform="matrix(1,0,0,1,7.14300012588501,4.019999980926514)">
                                                <path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(30,30,30)" strokeOpacity="1" strokeWidth="1.8" d=" M-6.243000030517578,-3.119999885559082 C-6.243000030517578,-3.119999885559082 0,3.119999885559082 0,3.119999885559082 C0,3.119999885559082 6.243000030517578,-3.119999885559082 6.243000030517578,-3.119999885559082"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </button>

                    {/* Zoom and Info Buttons */}
                    <div className="absolute pointer-events-auto bottom-4 right-4 z-30 hidden md:block">
                        <div className="flex flex-col items-end gap-1">
                            <button
                                className={`p-1.5 overflow-hidden rounded-lg border cursor-pointer ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'}`}
                                onClick={() => { /* Toggle zoom state or call zoom function */ }}
                            >
                                <div className="relative w-full h-full flex flex-col items-center justify-center gap-2">
                                    <button className={`opacity-100 cursor-pointer hover:opacity-75 active:opacity-50 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`} onClick={handleZoomInClick}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M18 11a7 7 0 11-14 0 7 7 0 0114 0zm-1.382 7.032a9 9 0 111.414-1.414l3.176 3.175a1 1 0 01-1.414 1.414l-3.176-3.175zM10.941 7a1 1 0 011 1v1.974H14a1 1 0 110 2h-2.059V14a1 1 0 11-2 0v-2.026H8a1 1 0 110-2h1.941V8a1 1 0 011-1z" fill="currentColor"></path>
                                        </svg>
                                    </button>
                                    <div className={`w-[14px] h-[2px] ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
                                    <button className={`opacity-100 cursor-pointer hover:opacity-75 active:opacity-50 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`} onClick={handleZoomOutClick}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M18 11a7 7 0 11-14 0 7 7 0 0114 0zm-1.382 7.032a9 9 0 111.414-1.414l3.176 3.175a1 1 0 01-1.414 1.414l-3.176-3.175zM15 10.974a1 1 0 01-1 1H8a1 1 0 110-2h6a1 1 0 011 1z" fill="currentColor"></path>
                                        </svg>
                                    </button>
                                </div>
                            </button>
                            <button
                                className={`p-1.5 rounded-lg flex justify-center items-center border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-100 border-gray-200 text-gray-800'}`}
                                onClick={handleInfoClick}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:opacity-75 active:opacity-50">
                                    <path d="M9.64 13.025c-.683 0-1.025-.498-1.025-1.143v-.224c0-1.25.605-2.08 1.875-2.842 1.181-.713 1.601-1.299 1.601-2.256 0-1.152-.888-1.943-2.187-1.943-1.182 0-1.963.586-2.275 1.65-.196.606-.499.82-.987.82-.605 0-.947-.36-.947-.957 0-.42.088-.761.264-1.142.595-1.348 2.08-2.168 4.033-2.168 2.549 0 4.316 1.494 4.316 3.652 0 1.514-.761 2.55-2.05 3.32-1.26.743-1.592 1.24-1.641 2.198-.049.625-.342 1.035-.977 1.035zm0 4.15c-.713 0-1.279-.547-1.279-1.26 0-.712.566-1.26 1.28-1.26.732 0 1.288.548 1.288 1.26 0 .713-.556 1.26-1.289 1.26z" fill="currentColor"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div> {/* End of !bg-white container */}
            </div> {/* End of data-testid="reader-based-listening-experience" */}
        </div>
    );
};

export default ReaderComponent;
