import React, { useState } from 'react';
import sunIcon from '/src/assets/images/sun-icon.svg';
import moonIcon from '/src/assets/images/moon-icon.svg';

const ThemeToggle = () => {
  const [active, setActive] = useState('light');

  const handleToggle = (mode) => {
    setActive(mode);
  };

  return (
    <div className="p-0.5 bg-gray-200 rounded-[10px] justify-center items-center gap-1 inline-flex shadow-xl relative transition-all">
      
      <div
        className="absolute h-8 bg-white w-70 rounded-full shadow-[0px_2px_4px_rgba(0,0,0,0.08)] transform transition-all"
        style={{
          width: '32px',
          height: '32px',
          transform: active === 'light' ? 'translateX(-17px)' : 'translateX(16px)',
        }}
      />

      {/* Light Button */}
      <button
        id="light"
        className={`p-1.5 rounded-lg bg-transparent outline-none transition-all relative z-10 ${
          active === 'light' ? 'text-icn-txt-prim' : 'text-icn-txt]'
        }`}
        aria-pressed={active === 'light'}
        onClick={() => handleToggle('light')}
      >
        <img src={sunIcon} alt="Light Mode" className="w-5 h-5" />
      </button>

      {/* Dark Button */}
      <button
        id="dark"
        className={`p-1.5 rounded-lg bg-transparent outline-none transition-all relative z-10 ${
          active === 'dark' ? 'text-icn-txt-prim' : 'text-icn-txt-sec'
        }`}
        aria-pressed={active === 'dark'}
        onClick={() => handleToggle('dark')}
      >
        <img src={moonIcon} alt="Dark Mode" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ThemeToggle;
