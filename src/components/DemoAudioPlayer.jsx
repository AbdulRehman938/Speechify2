import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const AudioWaveBar = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progressIndex, setProgressIndex] = useState(0);
    const totalBars = 50;

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateBars = () => {
            if (!audio.duration) return;

            const percent = audio.currentTime / audio.duration;
            const index = Math.floor(percent * totalBars);
            setProgressIndex(index);

            if (isPlaying) {
                requestAnimationFrame(updateBars);
            }
        };

        if (isPlaying) {
            requestAnimationFrame(updateBars);
        }

        return () => cancelAnimationFrame(updateBars);
    }, [isPlaying]);

    return (
        <div className="flex justify-center pl-[3rem] items-center gap-[0.5rem] w-full px-4 mt-[1rem]">
            <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

            {/* Play/Pause Button */}
            <button
                onClick={togglePlay}
                className="text-black text-[1rem] rounded-full bg-white w-[4rem] h-[3.5rem] flex items-center justify-center mr-[-2rem]"
            >
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            {/* Animated Bar Lines */}
            <div className="relative flex justify-center align-center items-center h-8 w-full max-w-xl items-end gap-[2px] overflow-hidden">
                {Array.from({ length: totalBars }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-[3px] rounded-sm ${i <= progressIndex ? 'bg-white' : 'bg-gray-400'
                            } ${isPlaying ? 'animate-wave' : ''}`}
                        style={{
                            height: `${Math.random() * 20 + 10}px`,
                            animationDelay: `${i * 0.05}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default AudioWaveBar;
