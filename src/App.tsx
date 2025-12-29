import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './monacoConfig';
import CodeEditor from './components/CodeEditor';
import ProblemStatement from './components/ProblemStatement';
import TestResults from './components/TestResults';
import { Language, TestCase } from './types';
import { sampleProblem } from './problems';
import { executeCode } from './codeExecutor';

function App() {
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState<string>(sampleProblem.starterCode.javascript);
  const [testResults, setTestResults] = useState<TestCase[]>(sampleProblem.testCases);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setCode(sampleProblem.starterCode[newLanguage]);
    // Reset test results when changing language
    setTestResults(sampleProblem.testCases);
  };

  const handleSubmit = async () => {
    setIsExecuting(true);
    
    try {
      const results = await executeCode(code, language, sampleProblem.testCases);
      setTestResults(results);
      
      const allPassed = results.every(tc => tc.passed === true);
      const passedCount = results.filter(tc => tc.passed === true).length;
      
      if (allPassed) {
        toast.success('🎉 All test cases passed! Great job!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(`❌ ${passedCount}/${results.length} test cases passed. Keep trying!`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error('An error occurred while running tests', {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Interview Code Editor</h1>
        <p>Choose a language, solve the problem, and submit your solution</p>
      </header>
      <div className="app-container">
        <div className="left-panel">
          <ProblemStatement
            title={sampleProblem.title}
            description={sampleProblem.description}
          />
          <TestResults testCases={testResults} />
        </div>
        <div className="right-panel">
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
            onLanguageChange={handleLanguageChange}
            onSubmit={handleSubmit}
            isExecuting={isExecuting}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
