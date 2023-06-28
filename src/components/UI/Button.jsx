import PropTypes from 'prop-types'

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

Button.propTypes = {
  onclick: PropTypes.func
}

export default Button;
