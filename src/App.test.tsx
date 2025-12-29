import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders interview code editor title', () => {
  render(<App />);
  const titleElement = screen.getByText(/interview code editor/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders problem statement', () => {
  render(<App />);
  const problemElement = screen.getByText(/Sum of Two Numbers/i);
  expect(problemElement).toBeInTheDocument();
});

test('renders submit button', () => {
  render(<App />);
  const submitButton = screen.getByText(/Submit Solution/i);
  expect(submitButton).toBeInTheDocument();
});

