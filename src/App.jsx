import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Questionnaire from './pages/Questionnaire.jsx';
import Result from './pages/Result.jsx';
import History from './pages/History.jsx';
import { useAuth } from './context/AuthContext.jsx';

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

export default function App() {
  const { user } = useAuth();
  return (
    <>
      {user && <Navbar />}
      <main className="page">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/check-in" element={<Protected><Questionnaire /></Protected>} />
          <Route path="/result" element={<Protected><Result /></Protected>} />
          <Route path="/history" element={<Protected><History /></Protected>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
