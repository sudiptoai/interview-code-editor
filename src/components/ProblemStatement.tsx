import React from 'react';
import './ProblemStatement.css';

interface ProblemStatementProps {
  title: string;
  description: string;
}

const ProblemStatement: React.FC<ProblemStatementProps> = ({ title, description }) => {
  return (
    <div className="problem-statement">
      <h2>{title}</h2>
      <div 
        className="problem-description"
        dangerouslySetInnerHTML={{ __html: description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') }}
      />
    </div>
  );
};

export default ProblemStatement;
