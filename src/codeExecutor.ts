import { Language, TestCase } from './types';

export const executeCode = async (
  code: string,
  language: Language,
  testCases: TestCase[]
): Promise<TestCase[]> => {
  let executableCode = code;

  // For TypeScript, we'll just strip the type annotations for now
  // In a production app, you'd use a proper TypeScript compiler service
  if (language === 'typescript') {
    try {
      // Simple type stripping - removes type annotations
      executableCode = code
        .replace(/:\s*\w+(\[\])?/g, '') // Remove type annotations
        .replace(/as\s+\w+/g, '') // Remove 'as' type assertions
        .replace(/<\w+>/g, ''); // Remove generic types
    } catch (error: any) {
      return testCases.map(tc => ({
        ...tc,
        passed: false,
        error: `TypeScript processing error: ${error.message}`,
      }));
    }
  }

  // Execute the code in a safe context
  try {
    // Clear any previous functions from window
    const functionNames = ['add']; // Add more function names as needed
    functionNames.forEach(name => {
      if ((window as any)[name]) {
        delete (window as any)[name];
      }
    });

    // Execute the user's code and assign to window
    // Wrap the code to ensure functions are attached to window
    const wrappedCode = `
      ${executableCode}
      // Auto-assign common function names to window
      if (typeof add !== 'undefined') window.add = add;
    `;
    
    // eslint-disable-next-line no-eval
    eval(wrappedCode);

    // Run all test cases
    const results = testCases.map(testCase => {
      try {
        const passed = testCase.fn();
        return {
          ...testCase,
          passed,
          error: passed ? undefined : 'Test case failed',
        };
      } catch (error: any) {
        return {
          ...testCase,
          passed: false,
          error: error.message || 'Runtime error',
        };
      }
    });

    return results;
  } catch (error: any) {
    return testCases.map(tc => ({
      ...tc,
      passed: false,
      error: `Execution error: ${error.message}`,
    }));
  }
};
