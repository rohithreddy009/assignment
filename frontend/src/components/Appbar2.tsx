import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-gray-900 text-white p-4">
      <h1>Striver's Assignment</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate('/')}
      >
        Submit new CodeSnippet
      </button>
    </div>
  );
};

export default AppBar;