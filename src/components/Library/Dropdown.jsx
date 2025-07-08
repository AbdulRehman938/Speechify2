import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Dropdown = ({ label, show, onClick, options, onSelect, renderOption, disabled = false, width = '10rem' }) => (
  <div className="relative h-full">
    <div
      onClick={!disabled ? onClick : null}
      className={`h-full w-[${width}] border rounded-[1rem] flex items-center justify-between px-2 py-1 ${disabled
        ? 'bg-gray-300 border-gray-200 cursor-not-allowed opacity-60'
        : 'bg-white border-gray-300 cursor-pointer hover:bg-gray-100'
      }`}
    >
      <span className="text-black text-xl">{label}</span>
      {show ? <FaChevronUp /> : <FaChevronDown />}
    </div>
    {show && !disabled && (
      <ul className={`absolute top-[110%] left-0 w-[${width}] bg-white border border-gray-300 rounded-[1rem] z-10 shadow-lg max-h-48 overflow-y-auto`}>
        {options.map((option, idx) => (
          <li key={idx} className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-[1rem]" onClick={() => onSelect(option)}>
            {renderOption ? renderOption(option) : option}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Dropdown;
