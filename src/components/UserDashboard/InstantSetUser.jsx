import React, { useState } from 'react';

const InstantSetUser = () => {
    const [toggleInstantListening, setToggleInstantListening] = useState(true);

    return (
        <div className='bg-white w-full h-[15%] relative rounded-[1rem] border-b-2 border-b-[#e9eaf0] flex flex-col items-center justify-between top-[0rem]'>
            <div className='bg-white h-[3rem] w-full relative top-[-1rem] flex flex-wrap justify-between items-center'>
                <span className='font-semibold text-[1.3rem] ml-[2rem]'>Instant Listening</span>
                <div id='toggle-btn' className='mr-[2rem]'>
                    <button role="switch" type="button" aria-checked={toggleInstantListening} onClick={() => setToggleInstantListening(!toggleInstantListening)} className={`h-6 w-[4rem] rounded-full flex p-spl-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#1D76ED] pt-[0.1rem] ${toggleInstantListening ? 'bg-[#2f43fa]' : 'bg-[#e9eaf0]'}`}>
                        <span className={`h-5 w-8 block relative transition rounded-full duration-300 ease-in-out transform bg-white ${toggleInstantListening ? 'translate-x-[90%]' : 'translate-x-[10%]'}`} />
                    </button>
                </div>
            </div>
            <p className='text-[#8d8d8d] relative inset-x-[-7.2rem] inset-y-[-0.6rem] font-medium'>
                Automatically launch listening as soon as your file is
            </p>
            <p className='text-[#8d8d8d] relative inset-x-[-13.5rem] inset-y-[-1rem] font-medium'>
                imported to your library.
            </p>
        </div>
    );
};

export default InstantSetUser;