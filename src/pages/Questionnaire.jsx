import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QUESTIONS, OPTIONS } from '../data/questions.js';
import { submitAnswers } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Questionnaire() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const q = QUESTIONS[current];
  const progress = Math.round((current / QUESTIONS.length) * 100);

  const choose = async (value) => {
    const updated = { ...answers, [q.id]: value };
    setAnswers(updated);

    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
      return;
    }
    setSaving(true);
    const { result, demo } = await submitAnswers(user.id, updated);
    navigate('/result', { state: { result, demo } });
  };

  if (saving) return <div className="card center">Calculating your stress score...</div>;

  return (
    <div className="quiz">
      <div className="progress"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
      <p className="muted">Question {current + 1} of {QUESTIONS.length} &middot; {q.category}</p>
      <h2 className="question">{q.text}</h2>
      <div className="options">
        {OPTIONS.map((label, value) => (
          <button
            key={label}
            className={`option ${answers[q.id] === value ? 'selected' : ''}`}
            onClick={() => choose(value)}
          >
            {label}
          </button>
        ))}
      </div>
      {current > 0 && (
        <button className="btn-link" onClick={() => setCurrent(current - 1)}>&larr; Previous question</button>
      )}
    </div>
  );
}
