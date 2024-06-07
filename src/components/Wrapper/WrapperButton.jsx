"use client";

const ButtonComponent = ({ onClick, children, className }) => {
  return (
    <div 
      onClick={onClick} 
      className={className}
    >
      {children}
    </div>
  );
};

export default ButtonComponent;
