import React, { useState } from 'react';
import axios from 'axios';

interface IFormData {
  username: string;
  codeLanguage: string;
  stdin: string;
  sourceCode: string;
}

export const SubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    username: '',
    codeLanguage: '',
    stdin: '',
    sourceCode: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false); // State to control success popup visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/submit', formData);
      console.log(response.data);
      setShowSuccessPopup(true); // Show success popup on successful submission
      setTimeout(() => setShowSuccessPopup(false), 3000); // Automatically hide popup after 3 seconds
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to submit the form:', error.response?.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex justify-start items-start pt-10">
      <form onSubmit={handleSubmit} className="w-4/5 bg-gray-900 p-8 rounded-lg shadow space-y-6" style={{ marginLeft: '10%' }}>
        <div className="text-white text-xl font-bold mb-4">Submit Your Code Snippet</div>
        
        <div>
          <label htmlFor="username" className="text-white">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 rounded mt-1"
          />
        </div>

        <div>
          <label htmlFor="codeLanguage" className="text-white">Preferred Code Language:</label>
          <select
            name="codeLanguage"
            value={formData.codeLanguage}
            onChange={handleChange}
            required
            className="w-full p-2 rounded mt-1 bg-gray-700 text-white"
          >
            <option value="">Select a language</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
          </select>
        </div>

        <div>
          <label htmlFor="stdin" className="text-white">Standard Input (stdin):</label>
          <input
            type="text"
            name="stdin"
            value={formData.stdin}
            onChange={handleChange}
            required
            className="w-full p-2 rounded mt-1"
          />
        </div>

        <div>
          <label htmlFor="sourceCode" className="block mb-2 text-sm font-medium text-white">Source Code:</label>
          <textarea
            name="sourceCode"
            value={formData.sourceCode}
            onChange={handleChange}
            required
            className="w-full p-4 rounded mt-1 bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            style={{ height: '512px' }} // Directly setting the height to be twice of h-32 (128px * 2)
          ></textarea>
      </div>



        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      
      {showSuccessPopup && (
        <div style={{
          position: 'absolute', 
          top: 0, 
          left: '50%', 
          transform: 'translateX(-50%)', 
          backgroundColor: '#4BB543', 
          color: 'white',
          padding: '10px 20px', 
          borderRadius: '0 0 10px 10px',
          zIndex: 1000, // Ensure it's above other content
        }}>
          Uploaded Successfully
        </div>
      )}
    </div>
  );
};

export default SubmissionForm;
