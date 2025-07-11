import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail } from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res) => {
  try {
    const { nombre, correo, password, fecha_nacimiento, estado_nacimiento, rol } = req.body;
    if (!nombre || !correo || !password || !fecha_nacimiento || !estado_nacimiento) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    const existingUser = await getUserByEmail(correo);
    if (existingUser) {
      return res.status(400).json({ message: 'Correo ya registrado' });
    }
    const hash = await bcrypt.hash(password, 10);
    // Si el rol no es especificado, por defecto es 'admin'
    const userRole = rol || 'admin';
    const userId = await createUser({ nombre, correo, password: hash, fecha_nacimiento, estado_nacimiento, rol: userRole });
    res.status(201).json({ message: 'Usuario registrado', id: userId });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const user = await getUserByEmail(correo);
    if (!user) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    const token = generateToken(user);
    res.json({ token, user: { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol } });
  } catch (err) {
    res.status(500).json({ message: 'Error en el login', error: err.message });
  }
};
