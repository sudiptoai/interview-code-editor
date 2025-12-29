import { useState } from 'react';
import { Problem, TestCase, DifficultyLevel, ProblemCategory } from '../types';
import { ProblemValidator } from '../services/problemValidator';

/**
 * Custom hook for managing problem editor form state
 * Follows Single Responsibility Principle - only handles form state management
 */
export function useProblemForm(initialProblem?: Problem) {
  const [id, setId] = useState(initialProblem?.id || '');
  const [title, setTitle] = useState(initialProblem?.title || '');
  const [description, setDescription] = useState(initialProblem?.description || '');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(initialProblem?.difficulty || 'Easy');
  const [category, setCategory] = useState<ProblemCategory>(initialProblem?.category || 'DSA');
  const [javascriptCode, setJavascriptCode] = useState(initialProblem?.starterCode.javascript || '');
  const [typescriptCode, setTypescriptCode] = useState(initialProblem?.starterCode.typescript || '');
  const [testCases, setTestCases] = useState<TestCase[]>(
    initialProblem?.testCases || [{ id: 1, description: '', fn: () => false }]
  );

  const validator = new ProblemValidator();

  const buildProblem = (): Problem => {
    return {
      id,
      title,
      description,
      difficulty,
      category,
      starterCode: {
        javascript: javascriptCode,
        typescript: typescriptCode
      },
      testCases: testCases.map(tc => ({
        id: tc.id,
        description: tc.description,
        fn: tc.fn
      }))
    };
  };

  const validate = () => {
    return validator.validateProblem(buildProblem());
  };

  const addTestCase = () => {
    const newId = testCases.length > 0 ? Math.max(...testCases.map(tc => tc.id)) + 1 : 1;
    setTestCases([...testCases, { id: newId, description: '', fn: () => false }]);
  };

  const removeTestCase = (id: number) => {
    setTestCases(testCases.filter(tc => tc.id !== id));
  };

  const updateTestCaseDescription = (id: number, description: string) => {
    setTestCases(testCases.map(tc => tc.id === id ? { ...tc, description } : tc));
  };

  const updateTestCaseFunction = (id: number, fnCode: string) => {
    setTestCases(testCases.map(tc => {
      if (tc.id === id) {
        try {
          // Using Function constructor to create test functions dynamically
          // Note: This should only be used by trusted admins
          // eslint-disable-next-line no-new-func
          const fn = new Function(`return (${fnCode})`)();
          return { ...tc, fn };
        } catch (e) {
          return tc;
        }
      }
      return tc;
    }));
  };

  return {
    // State
    id,
    title,
    description,
    difficulty,
    category,
    javascriptCode,
    typescriptCode,
    testCases,
    // Setters
    setId,
    setTitle,
    setDescription,
    setDifficulty,
    setCategory,
    setJavascriptCode,
    setTypescriptCode,
    // Actions
    addTestCase,
    removeTestCase,
    updateTestCaseDescription,
    updateTestCaseFunction,
    buildProblem,
    validate
  };
}
