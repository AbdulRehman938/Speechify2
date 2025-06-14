import React from 'react';
import socialButtons from '/src/constants/Login/socialButtons.js';

const SocialLoginButtons = () => {
  return (
    <div className='p-[1rem] text-[#000] w-full h-[14rem] flex flex-col text-center items-center relative inset-y-[-1rem]'>
      {socialButtons.map(({ img, text }, i) => (
        <div key={i} className="w-full h-[3.5rem] mt-[1rem] flex items-center justify-center gap-[1rem] border-[0.5px] border-[#c2c0c0] rounded-[1rem] px-3 hover:bg-[#f1f4f9] hover:scale-105 cursor-pointer active:scale-95">
          <img className="w-5 h-5 relative left-4" src={img} alt={`${text} icon`} />
          <p className="text-[1rem] font-semibold ml-[1rem] w-full text-center">{text}</p>
        </div>
      ))}
    </div>
  );
};

export default SocialLoginButtons;