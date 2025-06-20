import React, { useState } from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const Studio = () => {
    const handleToggle = () => {
        setIsPlaying((prev) => !prev);
    };
    const [isPlayingMainText, setIsPlayingMainText] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <>
            <div className='bg-black w-[75%] h-[70rem] relative top-[-10rem] flex flex-row align-center items-center mt-[20rem] justify-center'>
                <div className='bg-black h-full w-[30%] pl-[2rem]'>
                    <img className='rounded-full w-[14rem] h-[14rem] black' src="src\assets\images\cliff2-img.png" alt="error" />
                </div>
                <div className='bg-black h-full w-[70%] flex justify-start flex-col align-start items-start pr-[20rem]'>
                    <div className='w-full h-[4rem] bg-black flex justify-left relative right-[5rem] text-white'>
                        <button
                            onClick={handleToggle}
                            className='bg-red-900 w-[3rem] h-[3rem] rounded-full cursor-pointer object-cover flex items-center justify-center transition-transform duration-300 transform active:scale-90'
                        >
                            {isPlaying ? (
                                <FaPauseCircle className='object-cover h-full w-full animate-pop' />
                            ) : (
                                <FaPlayCircle className='object-cover h-full w-full animate-pop' />
                            )}
                        </button>
                        <h1 className='text-white font-medium text-[1.8rem] ml-[1.5rem]'>Hi, I'm Cliff Weitzman, founder of Speechify.</h1>
                    </div>
                    <p className='text-[1.8rem] mt-[2rem] font-medium'>I am dyslexic.</p>
                    <p className='text-[1.8rem] mt-[1rem] font-medium'>Growing up, my dad would read Harry Potter to me because I couldn't do it myself. He was my hero.</p>
                    <p className='text-[1.8rem] mt-[1rem] font-medium'>But without reading, I couldn't become the person I wanted to be.</p>
                    <p className='text-[1.8rem] mt-[1rem] font-medium'>So, I taught myself to code and built Speechify to read books to me.</p>
                    <p className='text-[1.8rem] mt-[1rem] font-medium'>Together with over 100 amazing engineers, we've become the largest provider of AI speech in the world.</p>
                    <p className='text-[1.8rem] mt-[1rem] font-medium'>Today, over 30 million people can achieve their full potential in school and society because Speechify lets them read faster, read more, and remember more.</p>
                    <p className='text-[1.8rem] mt-[1rem] font-medium'>Thank you for using Speechify!</p>
                    <img className='w-[20rem] h-[7rem] relative right-[4rem]' src="src\assets\images\cliff-sign.png" alt="error" />
                </div>
            </div>
        </>
    )
}

export default Studio