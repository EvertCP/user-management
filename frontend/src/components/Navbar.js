import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../services/authService';
import './Navbar.css';

function Navbar() {
  const user = getUser();
  const navigate = useNavigate();
  

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/profile">UserManagerApp</Link>
      </div>
      <div className="navbar-links">
        {user && (
          <>
            <Link to="/profile">Perfil</Link>
            {user.rol === 'superadmin' && (
              <Link to="/users">Usuarios</Link>
            )}
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        )}
        {!user && (
          <Link to="/login">Iniciar sesión</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
