import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders problem browser title', () => {
  render(<App />);
  const titleElement = screen.getByText(/interview code problems/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders problem statement', () => {
  render(<App />);
  const problemElement = screen.getByText(/Sum of Two Numbers/i);
  expect(problemElement).toBeInTheDocument();
});

test('renders progress dashboard', () => {
  render(<App />);
  const progressElement = screen.getByText(/Your Progress/i);
  expect(progressElement).toBeInTheDocument();
});

