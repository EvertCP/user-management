import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/users';

export async function getUsers() {
  const res = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return await res.json();
}

export async function createUser(user) {
  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error('Error al crear usuario');
  return await res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error('Error al eliminar usuario');
  return await res.json();
}
