import React from 'react';

interface LogoProps {
  variant?: 'default' | 'mark-only' | string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'default', className = '' }) => {
  if (variant === 'mark-only') {
    return (
      <img
        src="/favicon.svg"
        alt="Al-Mannan Enterprises"
        className={`w-10 h-10 object-contain shrink-0 ${className}`}
      />
    );
  }

  // Exact logo.svg as provided
  return (
    <img
      src="/logo.svg"
      alt="AL MANNAN ENTERPRISES"
      className={`h-12 sm:h-14 md:h-16 w-auto object-contain ${className}`}
    />
  );
};
