export interface Submission {
    id: string;
    username: string;
    codeLanguage: string;
    stdin: string;
    sourceCode: string;
    createdAt: string;
  }
  
  export interface SubmissionFormValues {
    username: string;
    codeLanguage: string;
    stdin: string;
    sourceCode: string;
  }
  