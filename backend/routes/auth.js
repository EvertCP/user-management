import express from 'express';
import { register, login } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import allowRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

// Registro de usuario (solo super admin puede crear admin)
router.post('/register', authMiddleware, allowRoles('superadmin'), register);
// Registro de usuario normal (sin autenticación)
router.post('/register-user', register);

// Login
router.post('/login', login);

export default router;
