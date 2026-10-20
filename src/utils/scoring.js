import { QUESTIONS } from '../data/questions.js';

export function levelFromScore(score) {
  if (score < 34) return 'Low';
  if (score < 67) return 'Moderate';
  return 'High';
}

// answers: { [questionId]: 0..4 }
// Local scoring used as a fallback when the Flask backend is not running (demo mode).
export function computeScore(answers) {
  const factors = QUESTIONS.map((q) => {
    const raw = Number(answers[q.id] ?? 0);
    const value = q.reverse ? 4 - raw : raw;
    return { category: q.category, impact: Math.round((value / 4) * 100) };
  });
  const total = factors.reduce((sum, f) => sum + f.impact, 0);
  const score = Math.round(total / factors.length);
  const topFactors = [...factors].sort((a, b) => b.impact - a.impact).slice(0, 3);
  return { score, level: levelFromScore(score), factors, topFactors };
}
