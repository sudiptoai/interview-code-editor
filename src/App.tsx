import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './monacoConfig';
import CodeEditor from './components/CodeEditor';
import ProblemStatement from './components/ProblemStatement';
import TestResults from './components/TestResults';
import ProblemBrowser from './components/ProblemBrowser';
import ProblemEditor from './components/ProblemEditor';
import { Language, TestCase, Problem } from './types';
import { problems as initialProblems } from './problems';
import { executeCode } from './codeExecutor';

function App() {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState<string>('');
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [problems, setProblems] = useState<Problem[]>(initialProblems);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [isCreatingProblem, setIsCreatingProblem] = useState(false);

  // Load solved problems from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('solvedProblems');
    if (saved) {
      setSolvedProblems(new Set(JSON.parse(saved)));
    }
  }, []);

  // Load admin mode from localStorage
  useEffect(() => {
    const adminMode = localStorage.getItem('isAdminMode');
    if (adminMode === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  // Load custom problems from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('customProblems');
    if (saved) {
      try {
        const customProblems = JSON.parse(saved);
        // Restore test case functions
        const restoredProblems = customProblems.map((p: any) => ({
          ...p,
          testCases: p.testCases.map((tc: any) => ({
            ...tc,
            // Using Function constructor to restore serialized test functions
            // This is necessary for dynamic problem creation but should only be used with trusted data
            // eslint-disable-next-line no-new-func
            fn: tc.fnCode ? new Function(`return (${tc.fnCode})`)() : () => false
          }))
        }));
        setProblems([...initialProblems, ...restoredProblems]);
      } catch (e) {
        console.error('Error loading custom problems from localStorage. Data may be corrupted:', e);
        // Clear corrupted data
        localStorage.removeItem('customProblems');
      }
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

  const toggleAdminMode = () => {
    const newAdminMode = !isAdminMode;
    setIsAdminMode(newAdminMode);
    localStorage.setItem('isAdminMode', String(newAdminMode));
    toast.info(newAdminMode ? '🔧 Admin mode enabled' : '👤 Admin mode disabled', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const handleSaveProblem = (problem: Problem) => {
    const existingIndex = problems.findIndex(p => p.id === problem.id);
    let updatedProblems: Problem[];
    
    if (existingIndex >= 0) {
      // Update existing problem
      updatedProblems = [...problems];
      updatedProblems[existingIndex] = problem;
      toast.success('✅ Problem updated successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });
    } else {
      // Add new problem
      updatedProblems = [...problems, problem];
      toast.success('✅ Problem created successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
    
    setProblems(updatedProblems);
    
    // Save custom problems to localStorage (excluding initial problems)
    const customProblems = updatedProblems.slice(initialProblems.length);
    const serializedProblems = customProblems.map(p => ({
      ...p,
      testCases: p.testCases.map(tc => ({
        ...tc,
        fnCode: tc.fn.toString(),
        fn: undefined
      }))
    }));
    localStorage.setItem('customProblems', JSON.stringify(serializedProblems));
    
    setEditingProblem(null);
    setIsCreatingProblem(false);
  };

  const handleEditProblem = (problem: Problem) => {
    setEditingProblem(problem);
  };

  const handleCreateProblem = () => {
    setIsCreatingProblem(true);
  };

  const handleCancelEdit = () => {
    setEditingProblem(null);
    setIsCreatingProblem(false);
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
    if (editingProblem || isCreatingProblem) {
      return (
        <>
          <ProblemEditor
            problem={editingProblem || undefined}
            onSave={handleSaveProblem}
            onCancel={handleCancelEdit}
          />
          <ToastContainer />
        </>
      );
    }

    return (
      <>
        <ProblemBrowser 
          problems={problems}
          onSelectProblem={handleSelectProblem}
          solvedProblems={solvedProblems}
          isAdminMode={isAdminMode}
          onToggleAdminMode={toggleAdminMode}
          onEditProblem={handleEditProblem}
          onCreateProblem={handleCreateProblem}
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
