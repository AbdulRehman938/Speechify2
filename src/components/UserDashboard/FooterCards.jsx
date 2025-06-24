import React from 'react';

const FooterCards = () => (
  <>
    <div className="w-full bg-white h-[8rem] border-b-2 border-b-[#e9eaf0] flex justify-between items-center rounded-[1rem] mt-[0.5rem] px-[1rem]">
      <span className="font-bold text-[1.2rem]">Have an idea?</span>
      <div className="h-[50%] w-[12rem] flex items-center justify-center text-black rounded-[1rem] bg-[#f1f1f1] hover:bg-[#d6d3d3] cursor-pointer" onClick={() => alert('Share your thoughts!')}>
        <span className="text-[1.1rem] font-bold">Share Your Thoughts</span>
      </div>
    </div>
    <div className="w-full bg-white h-[4rem] border-b-2 border-b-[#e9eaf0] flex justify-between items-center px-[1rem]">
      <span className="font-bold text-[1.2rem]">Deleted Files</span>
      <div className="flex items-center cursor-pointer" onClick={() => alert('Navigating to deleted files.')}>
        <span className="text-[1rem] text-[#c5c5c5] font-bold">0 files</span>
        <img className="ml-[0.5rem]" src="src/assets/icons/right-arrow.svg" alt="arrow" />
      </div>
    </div>
    <div className="w-full bg-white p-[1rem] h-[8rem] flex flex-col justify-between rounded-[1rem]">
      <span className="font-bold text-[1.2rem]">Get Help</span>
      <div className="flex gap-[0.6rem] mt-[1rem] h-[2.5rem]">
        <div className="w-[32%] h-[100%] rounded-[1rem] bg-[#f5f5fa] flex items-center justify-center font-bold cursor-pointer" onClick={() => alert('Opening WhatsApp...')}>Whatsapp</div>
        <div className="w-[32%] h-[100%] rounded-[1rem] bg-[#f5f5fa] flex items-center justify-center font-bold cursor-pointer" onClick={() => alert('Starting chat...')}>Start Chat</div>
        <div className="w-[32%] h-[100%] rounded-[1rem] bg-[#f5f5fa] flex items-center justify-center font-bold cursor-pointer" onClick={() => alert('Opening email...')}>Email</div>
      </div>
    </div>
  </>
);

export default FooterCards;