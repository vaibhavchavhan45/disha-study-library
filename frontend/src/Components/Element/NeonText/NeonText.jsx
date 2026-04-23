import './NeonText.css';

const NeonText = ({ children, className = "" }) => {
  return (
    <span className={`neon-gradient-text ${className}`}>
      {children}
    </span>
  );
};

export default NeonText;