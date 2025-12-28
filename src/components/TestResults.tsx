import React from 'react';
import { TestCase } from '../types';
import './TestResults.css';

interface TestResultsProps {
  testCases: TestCase[];
  onReset?: () => void;
}

const TestResults: React.FC<TestResultsProps> = ({ testCases, onReset }) => {
  const hasResults = testCases.some(tc => tc.passed !== undefined);
  const allPassed = testCases.every(tc => tc.passed === true);
  const passedCount = testCases.filter(tc => tc.passed === true).length;

  return (
    <div className="test-results">
      <div className="test-results-header">
        <h3>Test Cases</h3>
        {hasResults && (
          <div className={`test-summary ${allPassed ? 'success' : 'failure'}`}>
            {passedCount} / {testCases.length} passed
          </div>
        )}
      </div>
      <div className="test-cases-list">
        {testCases.map((testCase) => (
          <div
            key={testCase.id}
            className={`test-case ${
              testCase.passed === undefined
                ? 'pending'
                : testCase.passed
                ? 'passed'
                : 'failed'
            }`}
          >
            <div className="test-case-header">
              <span className="test-case-icon">
                {testCase.passed === undefined
                  ? '⚪'
                  : testCase.passed
                  ? '✓'
                  : '✗'}
              </span>
              <span className="test-case-description">
                Test {testCase.id}: {testCase.description}
              </span>
            </div>
            {testCase.error && (
              <div className="test-case-error">{testCase.error}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResults;
