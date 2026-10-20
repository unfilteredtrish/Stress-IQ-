import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { user } = await login(form);
    signIn(user);
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="login">
      <div className="login-hero">
        <h1>Stress<em>IQ</em></h1>
        <p>Answer a few questions, see your stress score, and track how it changes over time.</p>
      </div>
      <form className="card login-form" onSubmit={handleSubmit}>
        <h2>Welcome</h2>
        <label>
          Name
          <input name="name" value={form.name} onChange={update} placeholder="Your name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={update} placeholder="Password" required minLength={4} />
        </label>
        <button className="btn" disabled={loading}>{loading ? 'Please wait...' : 'Continue'}</button>
      </form>
    </div>
  );
}
