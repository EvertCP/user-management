import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';

import './Login.css';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    nombre: '',
    correo: '',
    password: '',
    fecha_nacimiento: '',
    estado_nacimiento: ''
  });
  const [registerMsg, setRegisterMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(correo, password);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Error de autenticación');
    }
  };

  const handleRegisterChange = e => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterMsg('');
    setError('');
    try {
      await register(registerData);
      setRegisterMsg('¡Registro exitoso! Ahora puedes iniciar sesión.');
      setRegisterData({ nombre: '', correo: '', password: '', fecha_nacimiento: '', estado_nacimiento: '' });
      setShowRegister(false);
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
    }
  };


  return (
    <div className="login-container">
      {!showRegister ? (
        <>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Entrar</button>
          </form>
          <button style={{marginTop:'1em'}} onClick={() => { setShowRegister(true); setError(''); setRegisterMsg(''); }}>Registrarse</button>
        </>
      ) : (
        <>
          <h2>Registro de Usuario</h2>
          <form onSubmit={handleRegister}>
            <input name="nombre" placeholder="Nombre" value={registerData.nombre} onChange={handleRegisterChange} required />
            <input name="correo" type="email" placeholder="Correo" value={registerData.correo} onChange={handleRegisterChange} required />
            <input name="password" type="password" placeholder="Contraseña" value={registerData.password} onChange={handleRegisterChange} required />
            <input name="fecha_nacimiento" type="date" placeholder="Fecha de nacimiento" value={registerData.fecha_nacimiento} onChange={handleRegisterChange} required />
            <input name="estado_nacimiento" placeholder="Estado de nacimiento" value={registerData.estado_nacimiento} onChange={handleRegisterChange} required />
            <button type="submit">Registrar</button>
            <button type="button" onClick={() => { setShowRegister(false); setError(''); setRegisterMsg(''); }} style={{marginLeft:'1em'}}>Cancelar</button>
          </form>
        </>
      )}
      {registerMsg && <p style={{color: 'green'}}>{registerMsg}</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}

export default Login;
