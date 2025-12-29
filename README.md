# Interview Code Editor

A modern, interactive code editor web application built with React and TypeScript for conducting technical interviews and coding challenges.

## Features

- **Multi-Language Support**: Choose between JavaScript and TypeScript
- **Monaco Editor Integration**: Powered by the same editor used in VS Code
- **Real-time Code Execution**: Run and test code directly in the browser
- **Automated Test Cases**: Pre-defined unit tests that run automatically
- **Visual Feedback**: 
  - Green checkmarks (✓) for passed tests
  - Red crosses (✗) for failed tests
  - Toast notifications for success/failure
  - Test result summaries
- **Unlimited Submissions**: Users can submit solutions as many times as needed
- **Responsive Design**: Works seamlessly on different screen sizes
- **Admin Mode**: Add and edit problems through an intuitive UI
  - Toggle between User and Admin modes
  - Create new coding problems with full customization
  - Edit existing problems, descriptions, and test cases
  - Changes persist in localStorage

## Screenshots

### Initial State
![Initial State](https://github.com/user-attachments/assets/85985ade-9746-466b-ba38-2524a0950459)

### Test Failure State
![Test Failure](https://github.com/user-attachments/assets/e1dfd395-d94e-4625-bc56-14154a759085)

### Test Success State (JavaScript)
![Test Success](https://github.com/user-attachments/assets/3fae6440-5b5b-462d-b1b8-c8537bbe2959)

### TypeScript Support
![TypeScript](https://github.com/user-attachments/assets/7888da2b-b684-4960-ba18-8a1ffd1912d3)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sudiptoai/interview-code-editor.git
cd interview-code-editor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Usage

1. **Choose a Language**: Click either JavaScript or TypeScript button
2. **Read the Problem**: Review the problem statement on the left panel
3. **Write Your Solution**: Use the Monaco editor to write your code
4. **Submit**: Click "Submit Solution" to run the tests
5. **Review Results**: See which tests passed or failed with detailed feedback

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Monaco Editor** - Code editor component
- **React Toastify** - Toast notifications
- **Create React App** - Build tooling

## Project Structure

```
src/
├── components/          # React components
│   ├── CodeEditor.tsx   # Monaco editor wrapper
│   ├── ProblemStatement.tsx  # Problem display
│   └── TestResults.tsx  # Test case results display
├── types.ts            # TypeScript type definitions
├── problems.ts         # Problem definitions and test cases
├── codeExecutor.ts     # Code execution engine
├── monacoConfig.ts     # Monaco editor configuration
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## Adding New Problems

### Using Admin Mode (Recommended)

The easiest way to add or edit problems is through the Admin Mode UI:

1. **Enable Admin Mode**: Click the "👤 User" button in the top-right corner to switch to "🔧 Admin" mode
2. **Add New Problem**: Click the "+ New Problem" button and fill in the form:
   - Problem ID (unique identifier, e.g., "sum-two-numbers")
   - Title and Description (supports markdown)
   - Difficulty level and Category
   - JavaScript and TypeScript starter code
   - Test cases with descriptions and validation functions
3. **Edit Existing Problems**: Click the "✏️ Edit" button on any problem card to modify:
   - Problem description and metadata
   - Test cases (add, remove, or modify)
   - Starter code for both languages

Problems created in Admin Mode are stored in your browser's localStorage and persist across sessions.

### Manual Method

Alternatively, you can add problems by editing `src/problems.ts`:

```typescript
export const sampleProblem: Problem = {
  id: 'your-problem-id',
  title: 'Your Problem Title',
  description: `Problem description with **markdown** support`,
  difficulty: 'Easy',
  category: 'DSA',
  starterCode: {
    javascript: `// Starter code for JavaScript`,
    typescript: `// Starter code for TypeScript`
  },
  testCases: [
    {
      id: 1,
      description: 'Test case description',
      fn: () => {
        // Test logic that returns true/false
        return window.yourFunction(input) === expectedOutput;
      }
    }
  ]
};
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Monaco Editor by Microsoft
- React Toastify for notifications
- Create React App for project scaffolding
