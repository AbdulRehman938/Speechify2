import React, { useState } from 'react';

const languages = [
    { name: "English", code: "en" },
    { name: "Spanish", code: "es" },
    { name: "French", code: "fr" },
    { name: "German", code: "de" },
    { name: "Portuguese", code: "pt" },
    { name: "Chinese", code: "zh" },
    { name: "Italian", code: "it" },
    { name: "Japanese", code: "ja" },
    { name: "Urdu", code: "ur" },
    // Add more languages as needed
];

const LangSetUser = () => {
  const [autoDetectLanguage, setAutoDetectLanguage] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English code

  const handleToggleAutoDetect = () => {
    setAutoDetectLanguage(prev => !prev);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className='bg-white w-full h-[25%] relative rounded-[1rem] border-b-2 border-b-[#e9eaf0] flex flex-col items-center justify-start py-4'>
      <div className='w-full flex justify-between items-center px-[2rem] mb-4'>
        <span className='font-semibold text-[1.3rem]'>Auto-detect Language</span>
        <button
          role="switch"
          type="button"
          aria-checked={autoDetectLanguage}
          tabIndex={0}
          onClick={handleToggleAutoDetect}
          className={`h-6 w-[4rem] rounded-full flex p-spl-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#1D76ED] pt-[0.1rem] ${autoDetectLanguage ? 'bg-[#2f43fa]' : 'bg-[#e9eaf0]'}`}
        >
          <span
            className={`h-5 w-8 block relative transition rounded-full duration-300 ease-in-out transform bg-white ${autoDetectLanguage ? 'translate-x-[90%]' : 'translate-x-[10%]'}`}
          />
        </button>
      </div>

      <p className='text-[#8d8d8d] text-left w-full px-[2rem] font-medium mb-4'>
        Automatically detects the language of your content for accurate pronunciation.
      </p>

      {!autoDetectLanguage && (
        <div className='w-full flex flex-col items-start px-[2rem] mt-2'>
          <label htmlFor="language-select" className="font-semibold text-[1.1rem] mb-2">Preferred Language:</label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="w-full p-2 border border-[#e9eaf0] rounded-[0.5rem] bg-[#f5f5fa] text-black text-[1rem]"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
          <p className='text-[#8d8d8d] text-left w-full mt-2 font-medium'>
            Select your preferred language if auto-detection is off.
          </p>
        </div>
      )}
    </div>
  );
};

export default LangSetUser;
