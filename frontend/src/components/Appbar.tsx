import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmissionIcon } from '../assets/SubmissionIcon';
import AssignmentIcon from "../assets/AssignmentIcon";


const AppBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-gray-900 text-white p-4">
      <div className="flex items-center gap-2 border-2 border-white p-2 rounded">
        <AssignmentIcon />
        <h1 className="hidden md:block font-bold text-lg m-0">Striver's Assignment</h1> {/* Hide on smaller screens */}
      </div>
      <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/submissions')}
        >
          <span className="hidden md:inline">View Submitted CodeSnippets</span> {/* Hide text on smaller screens */}
          <SubmissionIcon className="ml-2" />
      </button>
    </div>
  );
};

export default AppBar;
