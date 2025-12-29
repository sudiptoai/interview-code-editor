import { Problem } from '../types';

/**
 * Service for managing problem operations
 * Follows Single Responsibility Principle - only handles problem-related business logic
 * Follows Open/Closed Principle - can be extended without modification
 */

export interface IProblemStorage {
  saveProblems(problems: Problem[]): void;
  loadProblems(): Problem[];
  clearProblems(): void;
}

/**
 * LocalStorage implementation of problem storage
 * Can be easily swapped with other implementations (e.g., API, IndexedDB)
 */
export class LocalStorageProblemStorage implements IProblemStorage {
  private readonly storageKey = 'customProblems';

  saveProblems(problems: Problem[]): void {
    try {
      const serializedProblems = problems.map(p => ({
        ...p,
        testCases: p.testCases.map(tc => ({
          ...tc,
          fnCode: tc.fn.toString(),
          fn: undefined
        }))
      }));
      localStorage.setItem(this.storageKey, JSON.stringify(serializedProblems));
    } catch (error) {
      console.error('Error saving problems to localStorage:', error);
      throw new Error('Failed to save problems');
    }
  }

  loadProblems(): Problem[] {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (!saved) return [];

      const customProblems = JSON.parse(saved);
      return customProblems.map((p: any) => ({
        ...p,
        testCases: p.testCases.map((tc: any) => ({
          ...tc,
          // Using Function constructor to restore serialized test functions
          // This is necessary for dynamic problem creation but should only be used with trusted data
          // eslint-disable-next-line no-new-func
          fn: tc.fnCode ? new Function(`return (${tc.fnCode})`)() : () => false
        }))
      }));
    } catch (error) {
      console.error('Error loading problems from localStorage. Data may be corrupted:', error);
      this.clearProblems();
      return [];
    }
  }

  clearProblems(): void {
    localStorage.removeItem(this.storageKey);
  }
}

/**
 * Problem management service
 * Encapsulates all problem-related operations
 */
export class ProblemService {
  constructor(
    private storage: IProblemStorage,
    private initialProblems: Problem[]
  ) {}

  getAllProblems(): Problem[] {
    const customProblems = this.storage.loadProblems();
    return [...this.initialProblems, ...customProblems];
  }

  saveProblem(problem: Problem, existingProblems: Problem[]): Problem[] {
    const existingIndex = existingProblems.findIndex(p => p.id === problem.id);
    let updatedProblems: Problem[];

    if (existingIndex >= 0) {
      updatedProblems = [...existingProblems];
      updatedProblems[existingIndex] = problem;
    } else {
      updatedProblems = [...existingProblems, problem];
    }

    // Save only custom problems (excluding initial ones)
    const customProblems = updatedProblems.slice(this.initialProblems.length);
    this.storage.saveProblems(customProblems);

    return updatedProblems;
  }

  isProblemEditable(problemId: string): boolean {
    // Initial problems are read-only by default
    return !this.initialProblems.some(p => p.id === problemId);
  }
}
