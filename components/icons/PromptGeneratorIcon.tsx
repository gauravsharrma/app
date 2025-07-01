import React from 'react';

const PromptGeneratorIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
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
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 0 0-5 11.95A3.5 3.5 0 0 0 12 22a3.5 3.5 0 0 0 5-6.05A7 7 0 0 0 12 2z" />
  </svg>
);

export default PromptGeneratorIcon;
