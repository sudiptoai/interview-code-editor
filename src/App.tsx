import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './monacoConfig';
import CodeEditor from './components/CodeEditor';
import ProblemStatement from './components/ProblemStatement';
import TestResults from './components/TestResults';
import ProblemBrowser from './components/ProblemBrowser';
import { Language, TestCase, Problem } from './types';
import { problems } from './problems';
import { executeCode } from './codeExecutor';

function App() {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState<string>('');
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());

  // Load solved problems from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('solvedProblems');
    if (saved) {
      setSolvedProblems(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save solved problems to localStorage
  useEffect(() => {
    localStorage.setItem('solvedProblems', JSON.stringify(Array.from(solvedProblems)));
  }, [solvedProblems]);

  const handleSelectProblem = (problem: Problem) => {
    setSelectedProblem(problem);
    setLanguage('javascript');
    setCode(problem.starterCode.javascript);
    setTestResults(problem.testCases);
  };

  const handleBackToBrowser = () => {
    setSelectedProblem(null);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    if (!selectedProblem) return;
    setLanguage(newLanguage);
    setCode(selectedProblem.starterCode[newLanguage]);
    // Reset test results when changing language
    setTestResults(selectedProblem.testCases);
  };

  const handleSubmit = async () => {
    if (!selectedProblem) return;
    
    setIsExecuting(true);
    
    try {
      const results = await executeCode(code, language, selectedProblem.testCases);
      setTestResults(results);
      
      const allPassed = results.every(tc => tc.passed === true);
      const passedCount = results.filter(tc => tc.passed === true).length;
      
      if (allPassed) {
        // Mark problem as solved
        setSolvedProblems(prev => new Set(prev).add(selectedProblem.id));
        
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

  if (!selectedProblem) {
    return (
      <>
        <ProblemBrowser 
          problems={problems}
          onSelectProblem={handleSelectProblem}
          solvedProblems={solvedProblems}
        />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <button className="back-button" onClick={handleBackToBrowser}>
          ← Back to Problems
        </button>
        <div className="header-content">
          <h1>Interview Code Editor</h1>
          <p>Choose a language, solve the problem, and submit your solution</p>
        </div>
      </header>
      <div className="app-container">
        <div className="left-panel">
          <ProblemStatement
            title={selectedProblem.title}
            description={selectedProblem.description}
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
