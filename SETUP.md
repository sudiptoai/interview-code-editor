# Setup Guide - Running the App on Localhost

This guide provides step-by-step instructions for running the Interview Code Editor application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16 or higher (tested with v20.19.6)
- **npm**: v8 or higher (tested with v10.8.2)

To check your versions, run:
```bash
node --version
npm --version
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/sudiptoai/interview-code-editor.git
cd interview-code-editor
```

### 2. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

This will install all the packages listed in `package.json`, including:
- React 19
- TypeScript
- Monaco Editor
- React Toastify
- And other necessary dependencies

**Note**: You may see some deprecation warnings during installation. These are common in Create React App projects and won't prevent the app from running.

### 3. Start the Development Server

To start the application in development mode:

```bash
npm start
```

This command will:
- Start the React development server
- Automatically open your default browser
- Navigate to `http://localhost:3000`

**Default Port**: The app runs on port 3000 by default.

### 4. Verify the Application

Once the server starts, you should see:
- The Interview Code Problems page with a list of coding challenges
- Filters by category and difficulty
- Your progress tracker showing 0/10 problems solved

Click on any problem to:
- Open the Monaco code editor
- See the problem statement and test cases
- Choose between JavaScript or TypeScript
- Write and submit your solution

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
- The page will reload when you make changes
- You may also see any lint errors in the console

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.
- Optimizes the build for best performance
- The build is minified and filenames include hashes
- Your app is ready to be deployed!

### `npm run eject`
**Note**: This is a one-way operation. Once you eject, you can't go back!

If you need full control over the webpack configuration, you can eject at any time.

## Troubleshooting

### Port 3000 is Already in Use

If port 3000 is already occupied, you'll be prompted to use a different port. You can:
1. Accept the suggested alternative port
2. Or manually specify a port by setting the PORT environment variable:
   ```bash
   PORT=3001 npm start
   ```

### Dependencies Installation Fails

If `npm install` fails:
1. Clear the npm cache: `npm cache clean --force`
2. Delete `node_modules` folder and `package-lock.json`
3. Run `npm install` again

### Monaco Editor Warnings in Console

You may see warnings like "Could not create web worker(s)" in the browser console. These are informational and don't affect functionality - Monaco Editor falls back to loading worker code in the main thread.

## Technology Stack

- **React 19.2.3** - UI framework
- **TypeScript 4.9.5** - Type-safe development
- **Monaco Editor 0.55.1** - Code editor (same as VS Code)
- **React Toastify 11.0.5** - Toast notifications
- **React Scripts 5.0.1** - Build tooling (Create React App)

## Next Steps

After successfully running the app:
1. Browse the available coding problems
2. Select a problem to start coding
3. Choose JavaScript or TypeScript
4. Write your solution in the Monaco editor
5. Submit and see test results

For more information about features and usage, see the main [README.md](README.md).

## Support

If you encounter any issues not covered in this guide, please:
1. Check the [GitHub Issues](https://github.com/sudiptoai/interview-code-editor/issues)
2. Open a new issue with details about your problem

---

**Last Updated**: December 2025
