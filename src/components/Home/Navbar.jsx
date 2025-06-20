import React from 'react';
import { useNavigate } from 'react-router-dom';
import { navItems } from '/src/constants/homeContent';

const Navbar = ({ handleMouseEnter }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 z-50 w-full flex flex-col items-center bg-black">
      <div className="flex items-center w-[90%] justify-around py-2 bg-transparent pt-[1rem]">
        <img
          src="/src/assets/icons/speechify-logo-v1.svg"
          alt="home-logo"
          className="w-auto h-[2rem]"
        />

        <div className="text-white text-[1rem] font-medium flex items-center gap-4 text-wrap">
          {navItems.map((item, index) => (
            <span
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              className="relative cursor-pointer inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-[#918f8f]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            className="text-white hover:text-[#918f8f] inline font-semibold"
            onClick={() => navigate('/login')}
          >
            log In
          </button>

          <button className="group relative inline-flex items-center overflow-hidden rounded-[1rem] border-2 border-transparent bg-white px-[2rem] py-[0.5rem] text-[1rem] font-medium text-black hover:bg-black hover:text-white transition-colors duration-300 hover:px-[2rem] transition-all duration-300 ease-in-out">
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-[#2f43fa] opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
            <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-[-1rem]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span className="relative transform duration-700 group-hover:-translate-x-1">
              Try for Free
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
