import React, { useState, useMemo } from 'react';
import { Problem, DifficultyLevel, ProblemCategory } from '../types';
import './ProblemBrowser.css';

interface ProblemBrowserProps {
  problems: Problem[];
  onSelectProblem: (problem: Problem) => void;
  solvedProblems: Set<string>;
}

const ProblemBrowser: React.FC<ProblemBrowserProps> = ({ 
  problems, 
  onSelectProblem,
  solvedProblems
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'All'>('All');

  const categories: (ProblemCategory | 'All')[] = ['All', 'DSA', 'CSS', 'JavaScript', 'HTML', 'React', 'Design System', 'TypeScript'];
  const difficulties: (DifficultyLevel | 'All')[] = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          problem.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || problem.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [problems, searchQuery, selectedCategory, selectedDifficulty]);

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const stats = useMemo(() => {
    const total = problems.length;
    const solved = solvedProblems.size;
    const easy = problems.filter(p => p.difficulty === 'Easy').length;
    const medium = problems.filter(p => p.difficulty === 'Medium').length;
    const hard = problems.filter(p => p.difficulty === 'Hard').length;
    
    return { total, solved, easy, medium, hard };
  }, [problems, solvedProblems]);

  return (
    <div className="problem-browser">
      <div className="browser-header">
        <h1>Interview Code Problems</h1>
        <p>Select a problem to start coding</p>
      </div>

      <div className="browser-container">
        <div className="sidebar">
          <div className="progress-dashboard">
            <h3>Your Progress</h3>
            <div className="progress-stats">
              <div className="stat-item">
                <div className="stat-value">{stats.solved}/{stats.total}</div>
                <div className="stat-label">Solved</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{Math.round((stats.solved / stats.total) * 100)}%</div>
                <div className="stat-label">Completion</div>
              </div>
            </div>
            
            <div className="difficulty-breakdown">
              <h4>By Difficulty</h4>
              <div className="difficulty-stat">
                <span className="difficulty-badge" style={{ backgroundColor: '#10b981' }}>Easy</span>
                <span>{problems.filter(p => p.difficulty === 'Easy' && solvedProblems.has(p.id)).length}/{stats.easy}</span>
              </div>
              <div className="difficulty-stat">
                <span className="difficulty-badge" style={{ backgroundColor: '#f59e0b' }}>Medium</span>
                <span>{problems.filter(p => p.difficulty === 'Medium' && solvedProblems.has(p.id)).length}/{stats.medium}</span>
              </div>
              <div className="difficulty-stat">
                <span className="difficulty-badge" style={{ backgroundColor: '#ef4444' }}>Hard</span>
                <span>{problems.filter(p => p.difficulty === 'Hard' && solvedProblems.has(p.id)).length}/{stats.hard}</span>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3>Filters</h3>
            
            <div className="filter-group">
              <label>Category</label>
              <div className="filter-buttons">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Difficulty</label>
              <div className="filter-buttons">
                {difficulties.map(difficulty => (
                  <button
                    key={difficulty}
                    className={`filter-btn ${selectedDifficulty === difficulty ? 'active' : ''}`}
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="problems-main">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="problems-count">
            Showing {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''}
          </div>

          <div className="problems-list">
            {filteredProblems.length === 0 ? (
              <div className="no-problems">
                <p>No problems found matching your criteria.</p>
                <p>Try adjusting your filters or search query.</p>
              </div>
            ) : (
              filteredProblems.map(problem => (
                <div
                  key={problem.id}
                  className="problem-card"
                  onClick={() => onSelectProblem(problem)}
                >
                  <div className="problem-header">
                    <h3 className="problem-title">
                      {solvedProblems.has(problem.id) && <span className="solved-check">✓</span>}
                      {problem.title}
                    </h3>
                    <span 
                      className="difficulty-badge"
                      style={{ backgroundColor: getDifficultyColor(problem.difficulty) }}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                  <div className="problem-meta">
                    <span className="category-badge">{problem.category}</span>
                    <span className="test-count">{problem.testCases.length} test cases</span>
                  </div>
                  <p className="problem-preview">
                    {problem.description.split('\n')[0].substring(0, 120)}...
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemBrowser;
