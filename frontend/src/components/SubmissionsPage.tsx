import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ISubmission {
  username: string;
  codeLanguage: string;
  stdin: string;
  sourceCode: string;
  timestamp: string;
}

export const SubmissionsPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/submissions');
        setSubmissions(response.data);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-black">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Submitted Entries</h2>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Username</th>
              <th scope="col" className="py-3 px-6">Code Language</th>
              <th scope="col" className="py-3 px-6">Stdin</th>
              <th scope="col" className="py-3 px-6">Source Code (first 100 characters)</th>
              <th scope="col" className="py-3 px-6">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr className="bg-gray-800 border-b border-gray-700" key={index}>
                <th scope="row" className="py-4 px-6 font-medium text-white whitespace-nowrap">{submission.username}</th>
                <td className="py-4 px-6 text-white">{submission.codeLanguage}</td>
                <td className="py-4 px-6 text-white">{submission.stdin}</td>
                <td className="py-4 px-6 text-white">{submission.sourceCode.substring(0, 100)}</td>
                <td className="py-4 px-6 text-white">{new Date(submission.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionsPage;
