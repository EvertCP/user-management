# User Management App

Aplicación Full Stack para la gestión de usuarios con Node.js, Express, MySQL, JWT y React.

---

## Tecnologías principales
- **Backend:** Node.js, Express, MySQL, JWT
- **Frontend:** React, React Router DOM

---

## Instalación y configuración

### 1. Clona el repositorio
```bash
git clone https://github.com/EvertCP/user-management.git
cd user-management-app
```

### 2. Configura la base de datos MySQL
- Crea una base de datos llamada `user_management`.
- Ejecuta el script SQL para crear la tabla `users` 
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  estado_nacimiento VARCHAR(100) NOT NULL,
  rol ENUM('admin', 'superadmin') NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
- Configura el usuario y contraseña en el archivo `.env` del backend.

### 3. Backend
```bash
cd backend
npm install
```
- Crea un archivo `.env` con la siguiente estructura:
  ```env
  PORT=5000
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=tu_contraseña
  DB_NAME=user_management
  JWT_SECRET=supersecretkey
  ```
- Inicia el backend:
  ```bash
  npm run dev
  # o
  node server.js
  ```

### 4. Frontend
```bash
cd ../frontend
npm install
npm start
```
- El frontend estará disponible en [http://localhost:3000]

---

## Pruebas con Postman
- Importa la colección de pruebas desde `postman/coleccion_postman_prueba_tecnica.json` (puedes crearla o pedir el archivo de ejemplo).
- Consulta la documentación de la API en `backend/API_DOCUMENTATION.md`.

---

## Notas
- El usuario **superadmin** puede crear administradores y ver/eliminar usuarios.
- El usuario **admin** solo puede ver su perfil.

---

