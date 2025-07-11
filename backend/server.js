import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import cors from 'cors';

// Configuración de variables de entorno
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true
}));
// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
