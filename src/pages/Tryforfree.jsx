import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Keep this if you intend to navigate from here later

const Tryforfree = () => {
    // If you need any state or hooks on this page, declare them here
    const navigate = useNavigate(); // Uncomment if you add navigation logic

    // State to manage the selected content type (used for enabling "Continue")
    const [selectedOption, setSelectedOption] = useState(null);

    // State to manage the current progress stage.
    // For this page ("What do you want to listen to?"), we'll consider it Stage 1.
    const totalStages = 10;
    const currentStage = 1; // Always on stage 1 for the "What do you want to listen to?" screen

    const handleOptionClick = (optionName) => {
        setSelectedOption(optionName);
        console.log(`Selected: ${optionName}`);
    };

    const handleContinueClick = () => {
        if (selectedOption) {
            // Implement navigation to the next stage/page here
            // Example: navigate('/try_speechify/stage2');
            alert(`Continuing with: ${selectedOption}. Go to Stage 2 (or next page)!`);
            // For now, it just alerts, but you'd replace this with actual navigation
        }
    };

    return (
        <>
            {/* The main container div */}
            <div className='w-screen h-screen bg-white flex flex-col justify-center items-center'> {/* Changed align-center/text-center for better flexbox control */}

                {/* Header Section */}
                <header className="items-left flex w-full flex-col py-4 nc-sm:max-w-nc-navigation-tablet items-center min-h-[55px] mx-auto !pb-0 bg-white"> {/* Changed bg-glass-0 to bg-white for direct Tailwind */}
                    <img
                        alt="Speechify Logo"
                        loading="lazy"
                        width="130"
                        height="23"
                        decoding="async"
                        data-nimg="1"
                        className=""
                        src="https://website.cdn.speechify.com/speechify-logo.svg"
                        style={{ color: 'transparent' }}
                    />

                    {/* Progress Bar Section */}
                    <div className="my-2 nc-lg:mt-4 nc-lg:mb-0 flex w-full gap-1 py-2">
                        <div className="flex w-full">
                            <div className="bg-gray-200 relative h-0.5 w-full rounded-[20px] overflow-hidden">
                                {/* Inner progress bar fill */}
                                <div
                                    className="bg-blue-600 absolute left-0 top-0 h-full rounded-[20px] transition-all duration-300 ease-out"
                                    style={{ width: `${(currentStage / totalStages) * 100}%` }}
                                ></div>
                                {/* Stage markers - Optional, but gives visual cues for each stage */}
                                <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-[2px]">
                                    {[...Array(totalStages)].map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-1.5 h-1.5 rounded-full ${index < currentStage
                                                    ? 'bg-blue-600' // Already passed stages
                                                    : index === currentStage
                                                        ? 'bg-blue-600' // Current stage
                                                        : 'bg-gray-400' // Future stages
                                                }`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Section */}
                {/* Removed mt-nc-top classes as the outer div handles vertical centering */}
                <main className="pb-[120px] w-full max-w-nc-content-desktop flex flex-col items-center justify-start flex-grow"> {/* Added flex-grow to push footer down */}
                    <span className="text-gray-900 text-center"> {/* Changed text-glass-900 to text-gray-900 */}
                        <span className="-mb-4">
                            <h1 className="text-gray-800 dark:text-white font-semibold text-3xl xl:text-4xl 2xl:text-5xl mt-0 !mb-4 font-sans-serif !font-medium text-center">
                                What do you want to listen to?
                            </h1>
                            <p className="mb-2.5 min-h-5 mt-0 !mb-4 text-gray-700 nc-sm:max-w-nc-navigation-tablet nc-lg:max-w-nc-navigation-desktop !font-base mx-auto text-center">
                                The choice won’t limit your experience
                            </p>
                        </span>
                    </span>

                    <div className="mt-8 nc-sm:!mt-10 grid nc-sm:grid-cols-2 gap-3 w-full max-w-nc-navigation-desktop"> {/* Added w-full max-w- to grid container */}
                        {/* Reusable Button Component for Content Options */}
                        {[
                            { label: 'Books', icon: 'https://website.cdn.speechify.com/books.svg' },
                            { label: 'Academic materials', icon: 'https://website.cdn.speechify.com/academic_materials_1.svg' },
                            { label: 'Documents', icon: 'https://website.cdn.speechify.com/documents_1.svg' },
                            { label: 'Articles and stories', icon: 'https://website.cdn.speechify.com/articles_and_stories_1.svg' },
                            { label: 'Emails', icon: 'https://website.cdn.speechify.com/emails_1.svg' },
                            { label: 'AI chatbots', icon: 'https://website.cdn.speechify.com/ai_generated_content_1.svg' },
                            { label: 'My own writing', icon: 'https://website.cdn.speechify.com/my_own_writing.svg' },
                            { label: 'Other', icon: 'https://website.cdn.speechify.com/other_1.svg' },
                        ].map((item, index) => (
                            <button
                                key={index}
                                className={`flex w-full relative items-center rounded-2xl cursor-pointer outline-none p-4 transition-colors duration-200 ease-in-out bg-gray-100 hover:bg-gray-200 p-5 ${selectedOption === item.label ? 'border-2 border-blue-500' : 'border-2 border-transparent'
                                    }`}
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                                onClick={() => handleOptionClick(item.label)}
                            >
                                <img
                                    alt=""
                                    loading="lazy"
                                    width="24"
                                    height="24"
                                    decoding="async"
                                    data-nimg="1"
                                    className=""
                                    src={item.icon}
                                    style={{ color: 'transparent' }}
                                />
                                <span className="text-gray-700 text-left font-medium ml-3">
                                    {item.label}
                                </span>
                                <div className={`ml-auto w-6 h-6 rounded-[4px] pointer-events-none flex items-center justify-center transition-colors duration-200 ${selectedOption === item.label ? 'bg-blue-500 text-white' : 'bg-transparent border-2 border-[#DDDDE4]'
                                    }`}>
                                    {selectedOption === item.label && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </main>

                {/* Fixed Bottom Bar - Made relative to the flex container, not fixed to viewport */}
                {/* Changed from `fixed` to normal flow for centering within the parent div */}
                <div className="w-full bg-white flex justify-center z-50 p-4 nc-sm:!pt-2 nc-sm:!pb-12 nc-sm:!px-0 shadow-lg"> {/* Removed fixed positioning */}
                    <div className="w-full nc-sm:max-w-nc-navigation-tablet nc-lg:max-w-nc-navigation-desktop">
                        <button
                            className={`w-full bg-blue-600 text-white py-4 text-center font-bold outline-none transition-colors duration-200 ease-in-out rounded-xl ${selectedOption ? 'hover:bg-blue-700 cursor-pointer' : '!bg-gray-200 !text-gray-500 !cursor-not-allowed'
                                }`}
                            disabled={!selectedOption}
                            onClick={handleContinueClick}
                        >
                            <div className="flex items-center justify-center gap-2">Continue</div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tryforfree;