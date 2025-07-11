import pool from './db.js';

export const createUser = async (user) => {
  const [result] = await pool.query(
    'INSERT INTO users (nombre, correo, password, fecha_nacimiento, estado_nacimiento, rol) VALUES (?, ?, ?, ?, ?, ?)',
    [user.nombre, user.correo, user.password, user.fecha_nacimiento, user.estado_nacimiento, user.rol]
  );
  return result.insertId;
};

export const getUserByEmail = async (correo) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE correo = ?', [correo]);
  return rows[0];
};

export const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

export const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
};

export const updateUser = async (id, user) => {
  await pool.query(
    'UPDATE users SET nombre=?, correo=?, fecha_nacimiento=?, estado_nacimiento=?, rol=? WHERE id=?',
    [user.nombre, user.correo, user.fecha_nacimiento, user.estado_nacimiento, user.rol, id]
  );
};

export const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
};
