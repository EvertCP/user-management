# User Management API Documentation

## Base URL

```
http://localhost:5000/api
```

---

## Endpoints

### 1. Registro de Usuario Normal
- **POST** `/auth/register-user`
- **Body (JSON):**
```json
{
  "nombre": "Juan Perez",
  "correo": "juan@correo.com",
  "password": "123456",
  "fecha_nacimiento": "1990-01-01",
  "estado_nacimiento": "CDMX"
}
```
- **Auth:** No
- **Descripción:** Crea un usuario normal.

---

### 2. Login
- **POST** `/auth/login`
- **Body (JSON):**
```json
{
  "correo": "juan@correo.com",
  "password": "123456"
}
```
- **Auth:** No
- **Descripción:** Devuelve un token JWT si las credenciales son correctas.

---

### 3. Registro de Administrador/Superadmin
- **POST** `/auth/register`
- **Headers:**
  - `Authorization: Bearer <TOKEN_SUPERADMIN>`
- **Body (JSON):**
```json
{
  "nombre": "Admin Nuevo",
  "correo": "admin@correo.com",
  "password": "123456",
  "fecha_nacimiento": "1985-05-05",
  "estado_nacimiento": "Jalisco",
  "rol": "admin" // o "superadmin"
}
```
- **Auth:** Sí (solo superadmin)
- **Descripción:** Solo el superadmin puede crear administradores o superadmins.

---

### 4. Obtener Perfil del Usuario Autenticado
- **GET** `/users/profile`
- **Headers:**
  - `Authorization: Bearer <TOKEN>`
- **Auth:** Sí
- **Descripción:** Devuelve los datos del usuario autenticado.

---

### 5. Listar Todos los Usuarios
- **GET** `/users`
- **Headers:**
  - `Authorization: Bearer <TOKEN_SUPERADMIN>`
- **Auth:** Sí (solo superadmin)
- **Descripción:** Devuelve un array con todos los usuarios.

---

### 6. Editar Usuario
- **PUT** `/users/:id`
- **Headers:**
  - `Authorization: Bearer <TOKEN_SUPERADMIN>`
- **Body (JSON):**
```json
{
  "nombre": "Nuevo Nombre",
  "correo": "nuevo@correo.com",
  "fecha_nacimiento": "1992-02-02",
  "estado_nacimiento": "Nuevo León",
  "rol": "admin"
}
```
- **Auth:** Sí (solo superadmin)
- **Descripción:** Modifica los datos del usuario con el ID especificado.

---

### 7. Eliminar Usuario
- **DELETE** `/users/:id`
- **Headers:**
  - `Authorization: Bearer <TOKEN_SUPERADMIN>`
- **Auth:** Sí (solo superadmin)
- **Descripción:** Elimina el usuario con el ID especificado.

---

## Notas
- Todos los endpoints que requieren autenticación esperan el header:
  ```
  Authorization: Bearer <TOKEN>
  ```
- Los roles válidos son: `admin`, `superadmin`.
- Si intentas acceder a un endpoint sin permisos, recibirás un error 403 Forbidden.

---

## Ejemplo de flujo típico
1. Registrar usuario normal (`/auth/register-user`)
2. Login (`/auth/login`) → guardar el token
3. Usar el token para acceder a `/users/profile`
4. Si eres superadmin, puedes acceder a `/users`, crear admins, editar y eliminar usuarios.

---

## Errores comunes
- **400 Bad Request:** Faltan campos requeridos o datos inválidos.
- **401 Unauthorized:** Token inválido o no enviado.
- **403 Forbidden:** No tienes permisos suficientes para el endpoint.

---
