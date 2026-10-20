import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <span className="brand">Stress<em>IQ</em></span>
        <nav className="nav-links">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/check-in">Check-in</NavLink>
          <NavLink to="/history">History</NavLink>
        </nav>
        <div className="nav-user">
          <span>{user?.name}</span>
          <button className="btn-link" onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </header>
  );
}
