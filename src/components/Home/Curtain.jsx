import React from 'react';
import { curtainContentsMap, curtainImagesMap } from '/src/constants/homeContent';

const Curtain = ({
  showCurtain,
  handleMouseLeave,
  hoveredIndex,
  hoveredLiIndex,
  setHoveredLiIndex,
  fadeKey,
}) => {
  const items = curtainContentsMap[hoveredIndex];
  const images = curtainImagesMap[hoveredIndex];

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-50 bg-[#1a1919] text-white h-[35rem] pl-[20rem] pr-[25rem] pt-[5rem] overflow-hidden flex items-center
        transition-transform duration-700 ease-in-out
        ${showCurtain ? 'translate-y-0' : '-translate-y-full'}
      `}
      onMouseEnter={() => clearTimeout()}
      onMouseLeave={handleMouseLeave}
    >
      <div key={fadeKey} className="w-[90%] mx-auto text-[1rem] font-normal flex items-start justify-center">
        {hoveredIndex in curtainContentsMap ? (
          hoveredIndex === 6 ? (
            <div className="w-full animate-slide-up-fade-long flex justify-between items-start">
              <ul className="text-left animate-slide-up-fade-long">
                {items.map((text, idx) => (
                  <li key={idx} className="cursor-pointer bg-transparent w-[25rem] text-[1.5rem] px-4 py-1 rounded-md hover:text-[#918f8f] transition-colors duration-300">
                    {text}
                  </li>
                ))}
              </ul>
              <ul className="text-left animate-slide-up-fade-long h-[20rem] overflow-y-scroll no-scrollbar">
                {items.map((text, idx) => (
                  <li key={`scroll-${idx}`} className="cursor-pointer bg-transparent w-[25rem] text-[1.5rem] px-4 py-1 rounded-md hover:text-[#918f8f] transition-colors duration-300">
                    {text} (More Info)
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={`w-[100rem] object-cover animate-slide-up-fade-long ${images ? 'flex justify-between object-cover items-center' : 'flex justify-start object-cover items-start pt-[1rem]'}`}>
              <ul className="text-left animate-slide-up-fade-long">
                {items.map((text, idx) => (
                  <li key={idx} onMouseEnter={() => setHoveredLiIndex(idx)} onMouseLeave={() => setHoveredLiIndex(null)} className="cursor-pointer bg-transparent w-[25rem] text-[1.5rem] px-4 py-1 rounded-md hover:text-[#918f8f] transition-colors duration-300">
                    {text}
                  </li>
                ))}
              </ul>
              {images && (
                <div className="w-[35rem] h-[20rem] relative overflow-hidden animate-slide-up-fade-long">
                  {images.map((src, idx) => {
                    const isVisible = hoveredLiIndex === idx || (hoveredLiIndex === null && idx === 0);
                    return (
                      <img key={idx} src={src} alt={`curtain ${idx}`} className={`
                        absolute inset-0 w-[40rem] h-[30rem] transition-opacity duration-500 ease-in-out
                        ${isVisible ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                        animate-slide-up-fade-long
                      `} style={{ transitionProperty: 'opacity' }} />
                    );
                  })}
                </div>
              )}
            </div>
          )
        ) : <div className="animate-slide-up-fade-long" />}
      </div>
    </div>
  );
};

export default Curtain;
