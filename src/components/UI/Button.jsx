
const Button = ({children, className}) => {
  return (
    <button 
        className={className}
        onClick={onclick}
    >
      {children}
    </button>
  );
};

export default Button;
