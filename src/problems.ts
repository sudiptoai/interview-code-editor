import { Problem } from './types';

export const problems: Problem[] = [
  {
    id: 'sum-two-numbers',
    title: 'Sum of Two Numbers',
    difficulty: 'Easy',
    category: 'DSA',
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
  },
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    difficulty: 'Easy',
    category: 'DSA',
    description: `Write a function called **reverseString** that takes a string and returns it reversed.

**Example:**
\`\`\`
reverseString("hello") // returns "olleh"
reverseString("world") // returns "dlrow"
reverseString("") // returns ""
\`\`\`

**Requirements:**
- Function name must be \`reverseString\`
- Must accept one string parameter
- Must return the reversed string`,
    starterCode: {
      javascript: `// Write your solution here
function reverseString(str) {
  // Your code here
  return "";
}`,
      typescript: `// Write your solution here
function reverseString(str: string): string {
  // Your code here
  return "";
}`
    },
    testCases: [
      {
        id: 1,
        description: 'reverseString("hello") should return "olleh"',
        fn: () => {
          try {
            const result = (window as any).reverseString("hello");
            return result === "olleh";
          } catch (e) {
            return false;
          }
        }
      },
      {
        id: 2,
        description: 'reverseString("world") should return "dlrow"',
        fn: () => {
          try {
            const result = (window as any).reverseString("world");
            return result === "dlrow";
          } catch (e) {
            return false;
          }
        }
      },
      {
        id: 3,
        description: 'reverseString("") should return ""',
        fn: () => {
          try {
            const result = (window as any).reverseString("");
            return result === "";
          } catch (e) {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'fibonacci-sequence',
    title: 'Fibonacci Sequence',
    difficulty: 'Medium',
    category: 'DSA',
    description: `Write a function called **fibonacci** that returns the nth number in the Fibonacci sequence.

**Example:**
\`\`\`
fibonacci(0) // returns 0
fibonacci(1) // returns 1
fibonacci(5) // returns 5
fibonacci(10) // returns 55
\`\`\`

**Requirements:**
- Function name must be \`fibonacci\`
- Must accept one number parameter (n)
- Must return the nth Fibonacci number`,
    starterCode: {
      javascript: `// Write your solution here
function fibonacci(n) {
  // Your code here
  return 0;
}`,
      typescript: `// Write your solution here
function fibonacci(n: number): number {
  // Your code here
  return 0;
}`
    },
    testCases: [
      {
        id: 1,
        description: 'fibonacci(0) should return 0',
        fn: () => {
          try {
            const result = (window as any).fibonacci(0);
            return result === 0;
          } catch (e) {
            return false;
          }
        }
      },
      {
        id: 2,
        description: 'fibonacci(1) should return 1',
        fn: () => {
          try {
            const result = (window as any).fibonacci(1);
            return result === 1;
          } catch (e) {
            return false;
          }
        }
      },
      {
        id: 3,
        description: 'fibonacci(5) should return 5',
        fn: () => {
          try {
            const result = (window as any).fibonacci(5);
            return result === 5;
          } catch (e) {
            return false;
          }
        }
      },
      {
        id: 4,
        description: 'fibonacci(10) should return 55',
        fn: () => {
          try {
            const result = (window as any).fibonacci(10);
            return result === 55;
          } catch (e) {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'center-div',
    title: 'Center a Div',
    difficulty: 'Easy',
    category: 'CSS',
    description: `Create a CSS solution to center a div both horizontally and vertically in its parent container.

**Requirements:**
- Create a function \`getCenterStyles\` that returns a CSS string
- The div should be centered both horizontally and vertically
- Use modern CSS techniques (flexbox or grid)`,
    starterCode: {
      javascript: `// Write your solution here
function getCenterStyles() {
  // Return CSS string that centers a child div
  return "";
}`,
      typescript: `// Write your solution here
function getCenterStyles(): string {
  // Return CSS string that centers a child div
  return "";
}`
    },
    testCases: [
      {
        id: 1,
        description: 'Should return valid CSS with display property',
        fn: () => {
          try {
            const result = (window as any).getCenterStyles();
            return result.includes('display') && (result.includes('flex') || result.includes('grid'));
          } catch (e) {
            return false;
          }
        }
      },
      {
        id: 2,
        description: 'Should include centering properties',
        fn: () => {
          try {
            const result = (window as any).getCenterStyles();
            return (result.includes('center') || result.includes('justify') || result.includes('align'));
          } catch (e) {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'event-delegation',
    title: 'Event Delegation',
    difficulty: 'Medium',
    category: 'JavaScript',
    description: `Implement an event delegation function that handles clicks on dynamically added elements.

**Example:**
\`\`\`
delegateEvent(parentElement, 'button', handleClick)
\`\`\`

**Requirements:**
- Function name must be \`delegateEvent\`
- Should accept parent element, selector, and callback
- Should handle events on dynamically added elements`,
    starterCode: {
      javascript: `// Write your solution here
function delegateEvent(parent, selector, callback) {
  // Your code here
  return true;
}`,
      typescript: `// Write your solution here
function delegateEvent(parent: any, selector: string, callback: Function): boolean {
  // Your code here
  return true;
}`
    },
    testCases: [
      {
        id: 1,
        description: 'Should return true indicating setup',
        fn: () => {
          try {
            const result = (window as any).delegateEvent(document.body, 'button', () => {});
            return result === true;
          } catch (e) {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'semantic-html',
    title: 'Semantic HTML Structure',
    difficulty: 'Easy',
    category: 'HTML',
    description: `Create a function that returns a semantic HTML structure for a blog post.

**Requirements:**
- Function name must be \`createBlogHTML\`
- Should use semantic HTML5 elements
- Must include article, header, main, and footer tags`,
    starterCode: {
      javascript: `// Write your solution here
function createBlogHTML(title, content) {
  // Your code here
  return "";
}`,
      typescript: `// Write your solution here
function createBlogHTML(title: string, content: string): string {
  // Your code here
  return "";
}`
    },
    testCases: [
      {
        id: 1,
        description: 'Should include article tag',
        fn: () => {
          try {
            const result = (window as any).createBlogHTML("Test", "Content");
            return result.includes('<article>') || result.includes('<article ');
          } catch (e) {
            return false;
          }
        }
      },
      {
        id: 2,
        description: 'Should include semantic tags',
        fn: () => {
          try {
            const result = (window as any).createBlogHTML("Test", "Content");
            return result.includes('<header>') && result.includes('<main>');
          } catch (e) {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'useeffect-cleanup',
    title: 'useEffect Cleanup',
    difficulty: 'Medium',
    category: 'React',
    description: `Explain and implement proper cleanup in useEffect.

**Requirements:**
- Create a function \`describeCleanup\` that returns cleanup explanation
- Should mention when cleanup runs
- Should explain memory leak prevention`,
    starterCode: {
      javascript: `// Write your solution here
function describeCleanup() {
  // Return explanation of useEffect cleanup
  return "";
}`,
      typescript: `// Write your solution here
function describeCleanup(): string {
  // Return explanation of useEffect cleanup
  return "";
}`
    },
    testCases: [
      {
        id: 1,
        description: 'Should mention cleanup',
        fn: () => {
          try {
            const result = (window as any).describeCleanup();
            return result.toLowerCase().includes('cleanup');
          } catch (e) {
            return false;
          }
        }
      },
      {
        id: 2,
        description: 'Should be a valid string',
        fn: () => {
          try {
            const result = (window as any).describeCleanup();
            return typeof result === 'string' && result.length > 10;
          } catch (e) {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'color-system',
    title: 'Design System Color Palette',
    difficulty: 'Medium',
    category: 'Design System',
    description: `Create a function that generates a consistent color palette for a design system.

**Requirements:**
- Function name must be \`createColorPalette\`
- Should return an object with primary, secondary, and accent colors
- Each color should have multiple shades`,
    starterCode: {
      javascript: `// Write your solution here
function createColorPalette(baseColor) {
  // Your code here
  return {};
}`,
      typescript: `// Write your solution here
function createColorPalette(baseColor: string): object {
  // Your code here
  return {};
}`
    },
    testCases: [
      {
        id: 1,
        description: 'Should return an object',
        fn: () => {
          try {
            const result = (window as any).createColorPalette("#667eea");
            return typeof result === 'object' && result !== null;
          } catch (e) {
            return false;
          }
        }
      },
      {
        id: 2,
        description: 'Should have color properties',
        fn: () => {
          try {
            const result = (window as any).createColorPalette("#667eea");
            return Object.keys(result).length > 0;
          } catch (e) {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'type-guards',
    title: 'TypeScript Type Guards',
    difficulty: 'Hard',
    category: 'TypeScript',
    description: `Implement a type guard function in TypeScript.

**Requirements:**
- Function name must be \`isString\`
- Should properly narrow type to string
- Should return boolean`,
    starterCode: {
      javascript: `// Write your solution here
function isString(value) {
  // Your code here
  return false;
}`,
      typescript: `// Write your solution here
function isString(value: unknown): value is string {
  // Your code here
  return false;
}`
    },
    testCases: [
      {
        id: 1,
        description: 'isString("hello") should return true',
        fn: () => {
          try {
            const result = (window as any).isString("hello");
            return result === true;
          } catch (e) {
            return false;
          }
        }
      },
      {
        id: 2,
        description: 'isString(123) should return false',
        fn: () => {
          try {
            const result = (window as any).isString(123);
            return result === false;
          } catch (e) {
            return false;
          }
        }
      },
      {
        id: 3,
        description: 'isString(null) should return false',
        fn: () => {
          try {
            const result = (window as any).isString(null);
            return result === false;
          } catch (e) {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Hard',
    category: 'DSA',
    description: `Implement the binary search algorithm.

**Example:**
\`\`\`
binarySearch([1, 2, 3, 4, 5], 3) // returns 2
binarySearch([1, 2, 3, 4, 5], 6) // returns -1
\`\`\`

**Requirements:**
- Function name must be \`binarySearch\`
- Must use binary search algorithm
- Return index of target or -1 if not found`,
    starterCode: {
      javascript: `// Write your solution here
function binarySearch(arr, target) {
  // Your code here
  return -1;
}`,
      typescript: `// Write your solution here
function binarySearch(arr: number[], target: number): number {
  // Your code here
  return -1;
}`
    },
    testCases: [
      {
        id: 1,
        description: 'binarySearch([1, 2, 3, 4, 5], 3) should return 2',
        fn: () => {
          try {
            const result = (window as any).binarySearch([1, 2, 3, 4, 5], 3);
            return result === 2;
          } catch (e) {
            return false;
          }
        }
      },
      {
        id: 2,
        description: 'binarySearch([1, 2, 3, 4, 5], 6) should return -1',
        fn: () => {
          try {
            const result = (window as any).binarySearch([1, 2, 3, 4, 5], 6);
            return result === -1;
          } catch (e) {
            return false;
          }
        }
      },
      {
        id: 3,
        description: 'binarySearch([1, 2, 3, 4, 5], 1) should return 0',
        fn: () => {
          try {
            const result = (window as any).binarySearch([1, 2, 3, 4, 5], 1);
            return result === 0;
          } catch (e) {
            return false;
          }
        }
      }
    ]
  }
];

// Export for backward compatibility with existing code
// TODO: Consider deprecating this in favor of using problems array directly
export const sampleProblem = problems[0];
