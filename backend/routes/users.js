import express from 'express';
import { listUsers, getUser, editUser, removeUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import allowRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

// Listar usuarios (solo superadmin)
router.get('/', authMiddleware, allowRoles('superadmin'), listUsers);
// Obtener usuario por id (admin o superadmin)
router.get('/:id', authMiddleware, allowRoles('admin', 'superadmin'), getUser);
// Editar usuario (admin o superadmin)
router.put('/:id', authMiddleware, allowRoles('admin', 'superadmin'), editUser);
// Eliminar usuario (solo superadmin)
router.delete('/:id', authMiddleware, allowRoles('superadmin'), removeUser);

export default router;
