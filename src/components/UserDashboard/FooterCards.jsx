import React from 'react';

const FooterCards = () => (
  <>
    <div className="w-full bg-white h-[15%] border-b-2 border-b-[#e9eaf0] flex justify-between items-center rounded-[1rem] mt-[0.5rem] px-[1rem]">
      <span className="font-bold text-[1.2rem]">Have an idea?</span>
      <div className="h-[50%] w-[12rem] flex items-center justify-center text-black rounded-[1rem] bg-[#f1f1f1] hover:bg-[#d6d3d3] cursor-pointer">
        <span className="text-[1.1rem] font-bold">Share Your Thoughts</span>
      </div>
    </div>

    <div className="w-full bg-white h-[12%] border-b-2 border-b-[#e9eaf0] flex justify-between items-center px-[1rem]">
      <span className="font-bold text-[1.2rem]">Deleted Files</span>
      <div className="flex items-center">
        <span className="text-[1rem] text-[#c5c5c5] font-bold cursor-pointer">0 files</span>
        <img className="ml-[0.5rem] cursor-pointer" src="src/assets/icons/right-arrow.svg" alt="arrow" />
      </div>
    </div>

    <div className="w-full bg-white p-[1rem] h-[15%] flex flex-col justify-between rounded-[1rem]">
      <span className="font-bold text-[1.2rem]">Get Help</span>
      <div className="flex gap-[0.6rem] mt-[1rem] h-[2.5rem]">
        <div className="w-[32%] h-[90%] rounded-[1rem] bg-[#f5f5fa] flex items-center justify-center font-bold">Whatsapp</div>
        <div className="w-[32%] h-[90%] rounded-[1rem] bg-[#f5f5fa] flex items-center justify-center font-bold">Start Chat</div>
        <div className="w-[32%] h-[90%] rounded-[1rem] bg-[#f5f5fa] flex items-center justify-center font-bold">Email</div>
      </div>
    </div>
  </>
);

export default FooterCards;
