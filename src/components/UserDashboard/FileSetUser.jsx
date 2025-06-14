import React, { useState } from 'react';

const FileSetUser = () => {
  const [toggleFileSuggestions, setToggleFileSuggestions] = useState(true);

  return (
    <div className='bg-white w-full h-[15%] relative rounded-[1rem] border-b-2 border-b-[#e9eaf0] flex flex-col items-center justify-between top-[0rem]'>
      <div className='bg-white h-[3rem] w-full relative top-[-1rem] flex flex-wrap justify-between items-center'>
        <span className='font-semibold text-[1.3rem] ml-[2rem]'>File Suggestions</span>
        <div id='toggle-btn' className='mr-[2rem]'>
          <button
            role="switch"
            type="button"
            aria-checked={toggleFileSuggestions}
            tabIndex={0}
            onClick={() => setToggleFileSuggestions(!toggleFileSuggestions)}
            className={`h-6 w-[4rem] rounded-full flex p-spl-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#1D76ED] pt-[0.1rem] ${toggleFileSuggestions ? 'bg-[#2f43fa]' : 'bg-[#e9eaf0]'}`}
          >
            <span
              className={`h-5 w-8 block relative transition rounded-full duration-300 ease-in-out transform bg-white ${toggleFileSuggestions ? 'translate-x-[90%]' : 'translate-x-[10%]'}`}
            />
          </button>
        </div>
      </div>
      <p className='text-[#8d8d8d] relative inset-x-[-7.2rem] inset-y-[-0.6rem] font-medium'>Receive import suggestions in library from connected</p>
      <p className='text-[#8d8d8d] relative inset-x-[-9.2rem] inset-y-[-1rem] font-medium'>apps (e.g. Google Drive, Dropbox, OneDrive).</p>
    </div>
  );
};

export default FileSetUser;