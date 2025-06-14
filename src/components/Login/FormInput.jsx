import React from 'react';

const FormInput = ({ type, name, placeholder, value, onChange, onBlur, icon, onIconClick }) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
         
        className="w-full text-black h-[3rem] bg-[#f5f5fa] border-[0.5px] border-transparent rounded-[1rem] p-[0.5rem] text-[1rem] font-bold outline-none focus:border-blue-500 hover:bg-[#e2e2e2]"
      />
      {icon && (
        <img
          src={icon}
          alt="toggle-password"
          className="absolute top-[1rem] right-[1rem] h-5 w-5 cursor-pointer"
          onClick={onIconClick}
        />
      )}
    </div>
  );
};

export default FormInput;