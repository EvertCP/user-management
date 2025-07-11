const TOKEN_KEY = 'jwt_token';
const USER_KEY = 'jwt_user';
const API_URL = 'http://localhost:5000/api/auth';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function register({ nombre, correo, password, fecha_nacimiento, estado_nacimiento }) {
  console.log('Enviando fetch a /register-user', { nombre, correo, password, fecha_nacimiento, estado_nacimiento });
  const res = await fetch(`${API_URL}/register-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo, password, fecha_nacimiento, estado_nacimiento })
  });
  console.log('Respuesta del fetch', res);
  if (!res.ok) throw new Error('Error al registrar usuario');
  return await res.json();
}

export async function login(correo, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, password })
  });
  if (!res.ok) throw new Error('Credenciales inválidas');
  const data = await res.json();
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}
