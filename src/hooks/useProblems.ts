import { useState, useEffect, useCallback } from 'react';
import { Problem } from '../types';
import { ProblemService, LocalStorageProblemStorage } from '../services/problemService';
import { problems as initialProblems } from '../problems';

/**
 * Custom hook for managing problems
 * Follows Single Responsibility Principle - only handles problem state management
 * Provides a clean interface for problem operations
 */
export function useProblems() {
  const [problemService] = useState(
    () => new ProblemService(new LocalStorageProblemStorage(), initialProblems)
  );
  const [problems, setProblems] = useState<Problem[]>([]);

  // Load problems on mount
  useEffect(() => {
    const allProblems = problemService.getAllProblems();
    setProblems(allProblems);
  }, [problemService]);

  const saveProblem = useCallback((problem: Problem) => {
    const updatedProblems = problemService.saveProblem(problem, problems);
    setProblems(updatedProblems);
    return updatedProblems;
  }, [problemService, problems]);

  const isProblemEditable = useCallback((problemId: string) => {
    return problemService.isProblemEditable(problemId);
  }, [problemService]);

  return {
    problems,
    saveProblem,
    isProblemEditable
  };
}
