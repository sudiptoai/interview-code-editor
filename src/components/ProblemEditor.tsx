import React from 'react';
import { toast } from 'react-toastify';
import { Problem, DifficultyLevel, ProblemCategory } from '../types';
import { useProblemForm } from '../hooks/useProblemForm';
import './ProblemEditor.css';

interface ProblemEditorProps {
  problem?: Problem;
  onSave: (problem: Problem) => void;
  onCancel: () => void;
}

const ProblemEditor: React.FC<ProblemEditorProps> = ({ problem, onSave, onCancel }) => {
  const {
    id,
    title,
    description,
    difficulty,
    category,
    javascriptCode,
    typescriptCode,
    testCases,
    setId,
    setTitle,
    setDescription,
    setDifficulty,
    setCategory,
    setJavascriptCode,
    setTypescriptCode,
    addTestCase,
    removeTestCase,
    updateTestCaseDescription,
    updateTestCaseFunction,
    buildProblem,
    validate
  } = useProblemForm(problem);

  const difficulties: DifficultyLevel[] = ['Easy', 'Medium', 'Hard'];
  const categories: ProblemCategory[] = ['DSA', 'CSS', 'JavaScript', 'HTML', 'React', 'Design System', 'TypeScript'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationResult = validate();
    if (!validationResult.isValid) {
      toast.error(validationResult.errors.join(', '), {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    onSave(buildProblem());
  };

  return (
    <div className="problem-editor">
      <div className="editor-header">
        <h2>{problem ? 'Edit Problem' : 'Add New Problem'}</h2>
        <button className="close-btn" onClick={onCancel}>×</button>
      </div>
      
      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-row">
          <div className="form-group">
            <label>Problem ID *</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="e.g., sum-two-numbers"
              disabled={!!problem}
              required
            />
          </div>

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Problem title"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Difficulty *</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}>
              {difficulties.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as ProblemCategory)}>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Problem description (supports markdown)"
            rows={6}
            required
          />
        </div>

        <div className="form-group">
          <label>JavaScript Starter Code</label>
          <textarea
            value={javascriptCode}
            onChange={(e) => setJavascriptCode(e.target.value)}
            placeholder="// JavaScript starter code"
            rows={6}
          />
        </div>

        <div className="form-group">
          <label>TypeScript Starter Code</label>
          <textarea
            value={typescriptCode}
            onChange={(e) => setTypescriptCode(e.target.value)}
            placeholder="// TypeScript starter code"
            rows={6}
          />
        </div>

        <div className="test-cases-section">
          <div className="section-header">
            <h3>Test Cases</h3>
            <button type="button" onClick={addTestCase} className="add-test-btn">
              + Add Test Case
            </button>
          </div>

          {testCases.map((tc, index) => (
            <div key={tc.id} className="test-case-editor">
              <div className="test-case-header">
                <h4>Test Case {index + 1}</h4>
                {testCases.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTestCase(tc.id)}
                    className="remove-test-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={tc.description}
                  onChange={(e) => updateTestCaseDescription(tc.id, e.target.value)}
                  placeholder="Test case description"
                />
              </div>

              <div className="form-group">
                <label>Test Function (JavaScript function that returns boolean)</label>
                <textarea
                  placeholder="() => { try { return (window as any).functionName(args) === expected; } catch (e) { return false; } }"
                  rows={4}
                  onChange={(e) => updateTestCaseFunction(tc.id, e.target.value)}
                />
                <small className="help-text">
                  Example: () =&gt; &#123; try &#123; const result = (window as any).add(2, 3); return result === 5; &#125; catch (e) &#123; return false; &#125; &#125;
                </small>
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn">
            {problem ? 'Update Problem' : 'Create Problem'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProblemEditor;
