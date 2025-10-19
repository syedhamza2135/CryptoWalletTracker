import React from 'react';

const Loading = ({ 
  size = 'md', 
  color = 'blue', 
  centered = false, 
  fullScreen = false 
}) => {
  
  // Size classes
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  // Color classes
  const colors = {
    blue: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };
  
  const spinner = (
    <svg 
      className={`animate-spin ${sizes[size]} ${colors[color]}`}
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
  
  // Full screen overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }
  
  // Centered in container
  if (centered) {
    return (
      <div className="flex items-center justify-center w-full h-full py-8">
        {spinner}
      </div>
    );
  }
  
  // Inline
  return spinner;
};

export default Loading;