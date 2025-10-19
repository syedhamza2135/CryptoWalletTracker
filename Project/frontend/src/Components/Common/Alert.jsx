import React from 'react';

const Alert = ({ 
  type = 'info',
  message,
  title = null,
  onClose = null,
  dismissible = true,
  className = ''
}) => {
  
  // Alert types with colors and icons
  const alertTypes = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      leftBorder: 'border-l-green-500',
      text: 'text-green-800',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      leftBorder: 'border-l-red-500',
      text: 'text-red-800',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      leftBorder: 'border-l-yellow-500',
      text: 'text-yellow-800',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      leftBorder: 'border-l-blue-500',
      text: 'text-blue-800',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )
    }
  };
  
  const alert = alertTypes[type] || alertTypes.info;
  
  if (!message) return null;
  
  return (
    <div 
      className={`${alert.bg} border-l-4 ${alert.leftBorder} ${alert.text} rounded-lg p-4 mb-4 shadow-md transition-all duration-300 ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        {/* Icon */}
        <div className={`${alert.iconBg} ${alert.iconColor} rounded-lg p-2 mr-3 flex-shrink-0`}>
          {alert.icon}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          {title && (
            <h3 className="font-semibold mb-1">
              {title}
            </h3>
          )}
          <div className="text-sm">
            {message}
          </div>
        </div>
        
        {/* Close Button */}
        {dismissible && onClose && (
          <button
            onClick={onClose}
            className={`${alert.text} hover:bg-gray-200 rounded-full p-1 ml-3 flex-shrink-0 transition-colors duration-200`}
            aria-label="Close alert"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;