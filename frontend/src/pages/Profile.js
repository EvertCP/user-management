import React from 'react';
import { getUser, logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

import './Profile.css';

function Profile() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>
      <div className="profile-info">
        <p><b>Nombre:</b> {user.nombre}</p>
        <p><b>Correo:</b> {user.correo}</p>
        <p><b>Rol:</b> {user.rol}</p>
      </div>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Profile;
