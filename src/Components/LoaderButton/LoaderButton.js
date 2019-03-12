import React from 'react';
import './loaderButton.css';

const LoaderButton = ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) => (
  <button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {!isLoading ? text : loadingText}
  </button>
);

export default LoaderButton;