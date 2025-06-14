import React from 'react';

const StatsCard = () => (
  <div className="bg-white h-full w-[62%] rounded-[1rem] cursor-pointer">
    <div className="w-full h-[30%] mt-[0.5rem] flex items-center justify-between px-[1rem] text-black">
      <span className="text-[1.2rem] font-medium">Statistics</span>
      <img src="src/assets/icons/right-arrow.svg" alt="arrow" />
    </div>
    <div className="w-full h-[50%] px-[1rem]">
      <p className="text-[#d1cece] text-[1.8rem]">0 min</p>
      <div className="flex items-center justify-between">
        <span className="text-[#8b8b8b] font-medium">This week</span>
        <div className="bg-white w-[50%] flex gap-[1rem]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#e8eaf0] w-[4rem] h-[0.3rem] rounded-full" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default StatsCard;
