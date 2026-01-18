
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img 
      src="https://i.imgur.com/6vLQFOt.png" 
      alt="Lumbre Azul Logo" 
      className={`object-contain ${className}`} 
    />
  );
};
