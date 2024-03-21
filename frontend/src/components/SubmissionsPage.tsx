import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ISubmission {
  username: string;
  codeLanguage: string;
  stdin: string;
  sourceCode: string;
  timestamp: string;
  createdAt: string;
}

export const SubmissionsPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('https://strivers-assignment.onrender.com/submissions');
        setSubmissions(response.data);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  const handleRunCode = async (sourceCode: string, stdin: string) => {
    try {
      const encodedSource = btoa(unescape(encodeURIComponent(sourceCode)));
      const encodedStdin = btoa(unescape(encodeURIComponent(stdin)));
      const response = await axios({
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'a30367c67cmsh05dcb2a829920e1p161df6jsn8641c230e9c0',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
          language_id: 52, // Adjust based on actual language_id
          source_code: encodedSource,
          stdin: encodedStdin
        }
      });
      
      console.log(response.data); // Log the response data to see its structure

      // Assuming response.data contains a token to fetch the submission result
      if(response.data && response.data.token) {
        const token = response.data.token;
        const result = await axios({
          method: 'GET',
          url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
          params: { base64_encoded: 'true', fields: '*' },
          headers: {
            'X-RapidAPI-Key': 'a30367c67cmsh05dcb2a829920e1p161df6jsn8641c230e9c0',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        });

        console.log(result.data); // Log the result to see its structure

        // Example usage, adjust based on actual response structure
        alert(`Code executed. Status: ${result.data.status.description}`);
      } else {
        console.error('Submission token not found in response:', response.data);
        alert('Failed to run code: Submission token not found');
      }
    } catch (error) {
      console.error('Failed to run code:', error);
      alert('Failed to run code');
    }
};


  return (
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
                <th scope="col" className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr className="bg-gray-800 border-b border-gray-700" key={index}>
                  <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">{submission.username}</th>
                  <td className="py-4 px-6">{submission.codeLanguage}</td>
                  <td className="py-4 px-6">{submission.stdin}</td>
                  <td className="py-4 px-6">{submission.sourceCode.substring(0, 100)}</td>
                  <td className="py-4 px-6">{submission.createdAt ? new Date(submission.createdAt).toLocaleString() : 'N/A'}</td>
                  <td className="py-4 px-6">
                    <button 
                      onClick={() => handleRunCode(submission.sourceCode, submission.stdin)} 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Run
                    </button>
                  </td>
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface ISubmission {
//   username: string;
//   codeLanguage: string;
//   stdin: string;
//   sourceCode: string;
//   timestamp: string;
//   createdAt: string;
// }

// export const SubmissionsPage: React.FC = () => {
//   const [submissions, setSubmissions] = useState<ISubmission[]>([]);

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/submissions');
//         setSubmissions(response.data);
//       } catch (error) {
//         console.error("Failed to fetch submissions:", error);
//       }
//     };

//     fetchSubmissions();
//   }, []);

//   const handleRunCode = async (submissionId: string) => {
//     try {
//       const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
//         language_id: 52, // Assuming language_id 52 is for JavaScript
//         source_code: btoa(submissions.find(submission => submission.username === submissionId)?.sourceCode || ''),
//         stdin: btoa(submissions.find(submission => submission.username === submissionId)?.stdin || ''),
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-RapidAPI-Key': 'a30367c67cmsh05dcb2a829920e1p161df6jsn8641c230e9c0',
//           'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
//         }
//       });

//       console.log('Submitted code:', response.data);
      
//       const submissionStatus = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}`, {
//         headers: {
//           'X-RapidAPI-Key': 'a30367c67cmsh05dcb2a829920e1p161df6jsn8641c230e9c0',
//           'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
//         }
//       });

//       console.log('Submission status:', submissionStatus.data);

//       if (submissionStatus.data.status?.id === 3) {
//         alert('Code executed successfully!');
//         console.log('Output:', atob(submissionStatus.data.stdout || ''));
//       } else {
//         alert('Failed to execute code.');
//       }
//     } catch (error) {
//       console.error('Failed to run code:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <div className="container mx-auto p-4">
//         <h2 className="text-2xl font-bold mb-4 text-center">Submitted Entries</h2>
//         <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
//           <table className="w-full text-sm text-left">
//             <thead className="text-xs uppercase bg-gray-700">
//               <tr>
//                 <th scope="col" className="py-3 px-6">Username</th>
//                 <th scope="col" className="py-3 px-6">Code Language</th>
//                 <th scope="col" className="py-3 px-6">Stdin</th>
//                 <th scope="col" className="py-3 px-6">Source Code</th>
//                 <th scope="col" className="py-3 px-6">Timestamp</th>
//                 <th scope="col" className="py-3 px-6">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {submissions.map((submission, index) => (
//                 <tr className="bg-gray-800 border-b border-gray-700" key={index}>
//                   <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">{submission.username}</th>
//                   <td className="py-4 px-6">{submission.codeLanguage}</td>
//                   <td className="py-4 px-6">{submission.stdin}</td>
//                   <td className="py-4 px-6">{submission.sourceCode.substring(0, 100)}</td>
//                   <td className="py-4 px-6">{submission.createdAt ? new Date(submission.createdAt).toLocaleString() : 'N/A'}</td>
//                   <td className="py-4 px-6">
//                     <button onClick={() => handleRunCode(submission.username)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                       Run
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubmissionsPage;
