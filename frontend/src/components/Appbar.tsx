import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmissionIcon } from '../assets/SubmissionIcon'
import AssignmentIcon from "../assets/AssignmentIcon";


const AppBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-gray-900 text-white p-4">
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '2px solid white', padding: '10px', borderRadius: '5px' }}>
        <AssignmentIcon />
        <h1 style={{ fontWeight: 'bold', fontSize: '20px', margin: 0 }}>Striver's Assignment</h1>
    </div>
      <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/submissions')}
        >
          View Submitted CodeSnippets
          <SubmissionIcon className="mr-2" /> 
      </button>
    </div>
  );
};

export default AppBar;
