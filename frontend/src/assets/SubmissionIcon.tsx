import React from 'react';
interface SubmissionIcon {
  className?: string; 
}

export const SubmissionIcon: React.FC<SubmissionIcon> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ececec" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-bookmark ${className || ''}`}>
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
    </svg>
  )
}


