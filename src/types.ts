export type Language = 'javascript' | 'typescript';

export interface TestCase {
  id: number;
  description: string;
  fn: () => boolean;
  passed?: boolean;
  error?: string;
}

export interface Problem {
  title: string;
  description: string;
  starterCode: {
    javascript: string;
    typescript: string;
  };
  testCases: TestCase[];
}
