import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '/src/components/Library/Header';

const Library = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <Header navigate={navigate} />
      <h1 className='text-black text-[1.5rem] absolute top-[7rem] font-semibold'>
        Hey Abdul, Upload your first file
      </h1>
    </div>
  );
};

export default Library;
