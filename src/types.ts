export type Language = 'javascript' | 'typescript';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type ProblemCategory = 'DSA' | 'CSS' | 'JavaScript' | 'HTML' | 'React' | 'Design System' | 'TypeScript';

export interface TestCase {
  id: number;
  description: string;
  fn: () => boolean;
  passed?: boolean;
  error?: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  category: ProblemCategory;
  starterCode: {
    javascript: string;
    typescript: string;
  };
  testCases: TestCase[];
}

export interface ProblemProgress {
  problemId: string;
  completed: boolean;
  attempts: number;
  lastAttempted?: Date;
}
