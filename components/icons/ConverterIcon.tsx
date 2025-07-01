
import React from 'react';

const ConverterIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m16 16.01-4-4 4-4" />
    <path d="m8 8.01 4 4-4 4" />
  </svg>
);

export default ConverterIcon;
