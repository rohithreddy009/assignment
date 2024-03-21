// AssignmentIcon.tsx

import React from 'react';

interface AssignmentIconProps {
  className?: string;
}

const AssignmentIcon: React.FC<AssignmentIconProps> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="30" 
      height="30" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#ececec" 
      strokeWidth="2.25" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} // Apply className prop
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}

export default AssignmentIcon; // Ensure that AssignmentIcon is exported
