import React, { useState, useRef } from 'react';
import Curtain from '../../components/Home/Curtain';
import Navbar from '../../components/Studio/Navbar';
import GenCont from '../../components/genCont';
import Featured from '/src/components/Home/Featured';
import Studiogen from '../../components/Studio/Studiogen';
import Simba from '../../components/Home/Simba';
import FAQ from '../../components/Home/FAQ.jsx';
import Footer from '../../components/Home/Footer.jsx';

const Generate = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoveredLiIndex, setHoveredLiIndex] = useState(null);
    const [showCurtain, setShowCurtain] = useState(false);
    const [fadeKey, setFadeKey] = useState(0);
    const timeoutRef = useRef(null);

    const handleMouseEnter = (index) => {
        clearTimeout(timeoutRef.current);
        setHoveredIndex(index);
        setFadeKey((prev) => prev + 1);
        setShowCurtain(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowCurtain(false);
            setTimeout(() => {
                setHoveredIndex(null);
                setHoveredLiIndex(null);
            }, 1000);
        }, 100);
    };

    return (
        <div className="bg-black w-full min-h-screen flex justify-center">
            {/* Main centered container */}
            <div className="bg-black w-full min-h-screen flex flex-col justify-start items-center text-center overflow-hidden">
                <Curtain
                    showCurtain={showCurtain}
                    handleMouseLeave={handleMouseLeave}
                    hoveredIndex={hoveredIndex}
                    hoveredLiIndex={hoveredLiIndex}
                    setHoveredLiIndex={setHoveredLiIndex}
                    fadeKey={fadeKey}
                />

                <Navbar handleMouseEnter={handleMouseEnter} />

                <h1 className="font-normal text-5xl mt-10 z-[10] text-white relative top-[5rem]">Free AI Voice Generator</h1>

                <GenCont />

                <Featured />

                <Studiogen />

                <Simba />

                <FAQ />

                <Footer />
            </div>
        </div>
    );
};

export default Generate;
