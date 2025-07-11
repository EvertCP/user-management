import { getAllUsers, getUserById, updateUser, deleteUser, getUserByEmail } from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const listUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuario', error: err.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const { nombre, correo, fecha_nacimiento, estado_nacimiento, rol, password } = req.body;
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    let updatedUser = { nombre, correo, fecha_nacimiento, estado_nacimiento, rol: rol || user.rol };
    if (password) {
      updatedUser.password = await bcrypt.hash(password, 10);
    }
    await updateUser(req.params.id, updatedUser);
    res.json({ message: 'Usuario actualizado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: err.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    await deleteUser(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: err.message });
  }
};
