import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Language } from '../types';
import './CodeEditor.css';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onSubmit: () => void;
  isExecuting: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  onLanguageChange,
  onSubmit,
  isExecuting,
}) => {
  const [editorError, setEditorError] = useState<string | null>(null);

  const handleEditorDidMount = () => {
    setEditorError(null);
  };

  return (
    <div className="code-editor">
      <div className="editor-toolbar">
        <div className="language-selector">
          <button
            className={`lang-btn ${language === 'javascript' ? 'active' : ''}`}
            onClick={() => onLanguageChange('javascript')}
          >
            JavaScript
          </button>
          <button
            className={`lang-btn ${language === 'typescript' ? 'active' : ''}`}
            onClick={() => onLanguageChange('typescript')}
          >
            TypeScript
          </button>
        </div>
        <button
          className="submit-btn"
          onClick={onSubmit}
          disabled={isExecuting}
        >
          {isExecuting ? 'Running...' : 'Submit Solution'}
        </button>
      </div>
      <div className="editor-container">
        {editorError ? (
          <div className="editor-error">
            <p>{editorError}</p>
          </div>
        ) : (
          <Editor
            height="100%"
            language={language}
            value={value}
            onChange={(value) => onChange(value || '')}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            loading={<div className="editor-loading">Loading editor...</div>}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
