import { Problem } from './types';

export const sampleProblem: Problem = {
  title: 'Sum of Two Numbers',
  description: `Write a function called **add** that takes two numbers as parameters and returns their sum.

**Example:**
\`\`\`
add(2, 3) // returns 5
add(-1, 1) // returns 0
add(0, 0) // returns 0
\`\`\`

**Requirements:**
- Function name must be \`add\`
- Must accept two parameters
- Must return the sum of the two numbers`,
  starterCode: {
    javascript: `// Write your solution here
function add(a, b) {
  // Your code here
  return 0;
}`,
    typescript: `// Write your solution here
function add(a: number, b: number): number {
  // Your code here
  return 0;
}`
  },
  testCases: [
    {
      id: 1,
      description: 'add(2, 3) should return 5',
      fn: () => {
        try {
          const result = (window as any).add(2, 3);
          return result === 5;
        } catch (e) {
          return false;
        }
      }
    },
    {
      id: 2,
      description: 'add(-1, 1) should return 0',
      fn: () => {
        try {
          const result = (window as any).add(-1, 1);
          return result === 0;
        } catch (e) {
          return false;
        }
      }
    },
    {
      id: 3,
      description: 'add(0, 0) should return 0',
      fn: () => {
        try {
          const result = (window as any).add(0, 0);
          return result === 0;
        } catch (e) {
          return false;
        }
      }
    },
    {
      id: 4,
      description: 'add(100, 200) should return 300',
      fn: () => {
        try {
          const result = (window as any).add(100, 200);
          return result === 300;
        } catch (e) {
          return false;
        }
      }
    },
    {
      id: 5,
      description: 'add(-10, -20) should return -30',
      fn: () => {
        try {
          const result = (window as any).add(-10, -20);
          return result === -30;
        } catch (e) {
          return false;
        }
      }
    }
  ]
};
