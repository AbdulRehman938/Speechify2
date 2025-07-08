const ActionButton = ({ label, icon, onClick, className = '', id = '' }) => (
  <div
    id={id}
    onClick={onClick}
    className={`h-full w-[10rem] gap-[0.4rem] rounded-[1rem] p-[1rem] flex justify-center items-center cursor-pointer ${className}`}
  >
    {icon}
    <span className="font-medium text-2xl">{label}</span>
  </div>
);

export default ActionButton;
