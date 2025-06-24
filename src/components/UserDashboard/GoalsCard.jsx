import React from 'react';

const GoalsCard = () => (
  <div className="bg-white h-full w-[120%] rounded-[1rem] p-1 cursor-pointer">
    <div className="flex justify-between w-full h-[30%] mt-[1rem] px-[1rem]">
      <p className="text-[1.2rem] font-semibold">Daily Goal</p>
      <img className="w-[1.5rem] h-[1.5rem]" src="src/assets/images/pencil.png" alt="edit" />
    </div>
    <div className="w-full h-[50%] px-[1rem]">
      <p className="text-[#d1cece] font-medium text-[1.8rem]">0 min</p>
      <div className="flex items-center justify-between">
        <div className="bg-[#e9e5e5] w-[80%] h-[0.5rem] mt-[0.5rem] rounded-full" />
        <span className="text-[#1f1f1f] font-bold">2 hr</span>
      </div>
    </div>
  </div>
);

export default GoalsCard;
