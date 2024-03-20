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
    // Full-screen wrapper div
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Submitted Entries</h2>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-700">
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
                  <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">{submission.username}</th>
                  <td className="py-4 px-6">{submission.codeLanguage}</td>
                  <td className="py-4 px-6">{submission.stdin}</td>
                  <td className="py-4 px-6">{submission.sourceCode.substring(0, 100)}</td>
                  <td className="py-4 px-6">{new Date(submission.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;
