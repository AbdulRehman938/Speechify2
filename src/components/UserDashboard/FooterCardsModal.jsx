import React from 'react';

const FooterCardsModal = ({ onShareThoughts, onDeletedFiles }) => (
    <>
        <div onClick={onShareThoughts} className="w-full bg-white h-auto border-b-2 border-b-[#e9eaf0] flex justify-between items-center rounded-[1rem] mt-[0.5rem] px-[1rem] py-4 cursor-pointer">
            <span className="font-bold text-[1.2rem]">Have an idea?</span>
            <div className="h-full w-auto flex items-center justify-center text-black rounded-[1rem] bg-[#f1f1f1] hover:bg-[#d6d3d3] p-2">
                <span className="text-[1.1rem] font-bold">Share Your Thoughts</span>
            </div>
        </div>

        <div onClick={onDeletedFiles} className="w-full bg-white h-auto border-b-2 border-b-[#e9eaf0] flex justify-between items-center px-[1rem] py-4 cursor-pointer">
            <span className="font-bold text-[1.2rem]">Deleted Files</span>
            <div className="flex items-center">
                <span className="text-[1rem] text-[#c5c5c5] font-bold cursor-pointer">3 files</span>
                <img className="ml-[0.5rem] cursor-pointer" src="src/assets/icons/right-arrow.svg" alt="arrow" />
            </div>
        </div>
    </>
);

export default FooterCardsModal;