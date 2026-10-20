import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StressGauge from '../components/StressGauge.jsx';
import TrendChart from '../components/TrendChart.jsx';
import { getHistory } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  const [history, setHistory] = useState(null);

  useEffect(() => {
    getHistory(user.id).then(setHistory);
  }, [user.id]);

  if (!history) return <div className="card center">Loading...</div>;

  const latest = history[history.length - 1];
  const previous = history[history.length - 2];
  const average = history.length ? Math.round(history.reduce((s, h) => s + h.score, 0) / history.length) : 0;
  const change = latest && previous ? latest.score - previous.score : null;

  return (
    <div className="stack">
      <h1 className="greeting">Hello, {user.name}</h1>

      {!latest ? (
        <section className="card center">
          <h2>No check-ins yet</h2>
          <p className="muted">Take your first check-in to see your stress score.</p>
          <Link className="btn" to="/check-in">Start check-in</Link>
        </section>
      ) : (
        <>
          <div className="grid-2">
            <section className="card center">
              <h3>Latest score</h3>
              <StressGauge score={latest.score} />
            </section>
            <section className="card stats">
              <div><span className="stat-num">{history.length}</span><span className="muted">check-ins</span></div>
              <div><span className="stat-num">{average}</span><span className="muted">average score</span></div>
              <div>
                <span className="stat-num">{change === null ? '-' : `${change > 0 ? '+' : ''}${change}`}</span>
                <span className="muted">since last time</span>
              </div>
              <Link className="btn" to="/check-in">New check-in</Link>
            </section>
          </div>

          <section className="card">
            <h3>Your stress trend</h3>
            <TrendChart history={history} />
          </section>
        </>
      )}
    </div>
  );
}
