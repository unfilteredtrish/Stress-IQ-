import axios from 'axios';
import { computeScore } from '../utils/scoring.js';

const api = axios.create({ baseURL: '/api', timeout: 6000 });

const HISTORY_KEY = (userId) => `stressiq_history_${userId}`;
const readLocal = (userId) => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY(userId))) || [];
  } catch {
    return [];
  }
};

// Every call tries the Flask backend first. If it is unreachable, the app keeps working
// in demo mode using browser storage, so the frontend can be shown without the backend.

export async function login({ name, email, password }) {
  try {
    const { data } = await api.post('/login', { name, email, password });
    return { user: data, demo: false };
  } catch {
    return { user: { id: email.toLowerCase(), name: name || email.split('@')[0], email }, demo: true };
  }
}

export async function submitAnswers(userId, answers) {
  try {
    const { data } = await api.post('/submit', { userId, answers });
    return { result: data, demo: false }; // expected: { score, level, topFactors: [{category, impact}] }
  } catch {
    const result = computeScore(answers);
    const entry = { score: result.score, level: result.level, date: new Date().toISOString() };
    localStorage.setItem(HISTORY_KEY(userId), JSON.stringify([...readLocal(userId), entry]));
    return { result, demo: true };
  }
}

export async function getHistory(userId) {
  try {
    const { data } = await api.get(`/history/${encodeURIComponent(userId)}`);
    return data; // expected: [{ score, level, date }]
  } catch {
    return readLocal(userId);
  }
}
