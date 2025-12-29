import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage with type safety
 * Follows Single Responsibility Principle - only handles localStorage operations
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue] as const;
}

/**
 * Hook for managing solved problems
 */
export function useSolvedProblems() {
  const [solvedProblemsArray] = useLocalStorage<string[]>('solvedProblems', []);
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set(solvedProblemsArray));

  useEffect(() => {
    localStorage.setItem('solvedProblems', JSON.stringify(Array.from(solvedProblems)));
  }, [solvedProblems]);

  useEffect(() => {
    setSolvedProblems(new Set(solvedProblemsArray));
  }, [solvedProblemsArray]);

  return [solvedProblems, setSolvedProblems] as const;
}

/**
 * Hook for managing admin mode state
 */
export function useAdminMode() {
  const [isAdminMode, setIsAdminMode] = useLocalStorage<boolean>('isAdminMode', false);
  
  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  return { isAdminMode, toggleAdminMode, setIsAdminMode } as const;
}
