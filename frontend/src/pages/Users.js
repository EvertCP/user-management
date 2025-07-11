import React, { useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser } from '../services/userService';
import { getUser } from '../services/authService';

import './Users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [estadoNacimiento, setEstadoNacimiento] = useState('');
  const [rol, setRol] = useState('admin');
  const [error, setError] = useState('');
  const currentUser = getUser();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError('No se pudo cargar la lista de usuarios');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createUser({ nombre, correo, password, fecha_nacimiento: fechaNacimiento, estado_nacimiento: estadoNacimiento, rol });
      setNombre(''); setCorreo(''); setPassword(''); setFechaNacimiento(''); setEstadoNacimiento('');
      fetchUsers();
    } catch (err) {
      setError('No se pudo crear el usuario');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError('No se pudo eliminar el usuario');
    }
  };

  return (
    <div className="users-container">
      <h2>Lista de Usuarios</h2>
      {error && <p style={{color: 'red', marginBottom: '1em'}}>{error}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
              <td>
                {currentUser.rol === 'superadmin' && (
                  <button onClick={() => handleDelete(u.id)}>Eliminar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{marginTop: '2em'}}>Crear Usuario</h3>
      <form className="create-user-form" onSubmit={handleCreate}>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="date" placeholder="Fecha de Nacimiento" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} required />
        <input placeholder="Estado de Nacimiento" value={estadoNacimiento} onChange={e => setEstadoNacimiento(e.target.value)} required />
        <select value={rol} onChange={e => setRol(e.target.value)}>
          <option value="admin">Administrador</option>
          <option value="superadmin">Super Administrador</option>
        </select>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default Users;
