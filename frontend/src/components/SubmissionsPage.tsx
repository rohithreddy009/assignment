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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Submitted Entries</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Username</th>
            <th className="border-b p-2">Code Language</th>
            <th className="border-b p-2">Stdin</th>
            <th className="border-b p-2">Source Code (first 100 characters)</th>
            <th className="border-b p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index}>
              <td className="p-2">{submission.username}</td>
              <td className="p-2">{submission.codeLanguage}</td>
              <td className="p-2">{submission.stdin}</td>
              <td className="p-2">{submission.sourceCode.substring(0, 100)}</td>
              <td className="p-2">{new Date(submission.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsPage;
