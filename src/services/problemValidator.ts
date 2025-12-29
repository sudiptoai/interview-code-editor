import { Problem } from '../types';

/**
 * Validation service for problem forms
 * Follows Single Responsibility Principle - only handles validation logic
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ProblemValidator {
  validateProblem(problem: Partial<Problem>): ValidationResult {
    const errors: string[] = [];

    if (!problem.id || problem.id.trim() === '') {
      errors.push('Problem ID is required');
    }

    if (!problem.title || problem.title.trim() === '') {
      errors.push('Title is required');
    }

    if (!problem.description || problem.description.trim() === '') {
      errors.push('Description is required');
    }

    if (problem.testCases && problem.testCases.length === 0) {
      errors.push('At least one test case is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateTestCaseFunction(fnCode: string): { isValid: boolean; error?: string } {
    if (!fnCode || fnCode.trim() === '') {
      return { isValid: false, error: 'Test function code is required' };
    }

    try {
      // eslint-disable-next-line no-new-func
      new Function(`return (${fnCode})`)();
      return { isValid: true };
    } catch (e) {
      return { isValid: false, error: 'Invalid function syntax' };
    }
  }
}
