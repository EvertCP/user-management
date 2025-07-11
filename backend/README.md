# Backend - User Management API

Tecnologías: Node.js, Express, MySQL, JWT

## Estructura principal
- `server.js`: Punto de entrada.
- `routes/`: Rutas de la API.
- `controllers/`: Lógica de negocio.
- `models/`: Modelos de datos y conexión MySQL.
- `middleware/`: Middlewares de autenticación y autorización.

## Endpoints principales
- POST `/api/auth/register`: Registro de usuario
- POST `/api/auth/login`: Login
- GET `/api/users`: Listar usuarios (solo super admin)
- PUT `/api/users/:id`: Editar usuario
- DELETE `/api/users/:id`: Eliminar usuario (solo super admin)

## Cómo iniciar
```
npm install
npm run dev
```

Configura tu base de datos en el archivo `.env`.
