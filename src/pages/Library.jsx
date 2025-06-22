import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '/src/components/Library/Header';

const Library = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <Header navigate={navigate} />
      
    </div>
  );
};

export default Library;
