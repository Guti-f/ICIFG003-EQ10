# 🎓 Sistema de Gestión de Entrevistas a Apoderados

Aplicación web para que el equipo docente de un colegio agende y administre entrevistas con apoderados de manera centralizada.

Proyecto académico desarrollado para la asignatura **ICIF G003 — Aplicaciones y Tecnologías de la Web** (Taller 2).

---

## 👥 Equipo 16

| Integrante | Rol |
|---|---|
| Lucas Chong | Desarrollador (CRUD de Apoderados + funcionalidad de Entrevistas + CRUD de Profesores)|

---

## 🛠️ Tecnologías

**Backend**
- Java 17
- Spring Boot 3.x
- Spring Data JPA
- Spring Web
- PostgreSQL 16
- Maven

**Frontend**
- Angular 19 (standalone components)
- TypeScript
- RxJS + Signals
- Reactive Forms
- Bootstrap 5
- Lazy loading

---

## 📁 Estructura del proyecto

ICIFG003-EQ10/
├── backend/                              # API REST en Spring Boot
│   └── src/main/java/com/colegio/backend/
│       ├── BackendApplication.java
│       ├── CorsConfig.java
│       ├── auth/                         # Autenticación
│       ├── apoderado/                    # CRUD Apoderados
│       ├── profesor/                     # CRUD Profesores
│       └── entrevista/                   # Funcionalidad de Entrevistas
│
├── frontend/                             # SPA en Angular
│   └── src/app/
│       ├── core/                         # Servicios y guards globales
│       │   ├── guards/auth.guard.ts
│       │   └── services/auth.service.ts
│       └── features/                     # Módulos por funcionalidad
│           ├── home/                     # Landing page
│           ├── auth/                     # Login
│           ├── menu/                     # Menú principal
│           ├── apoderados/               # CRUD Apoderados
│           ├── profesores/               # CRUD Profesores
│           └── entrevistas/              # Funcionalidad de Entrevistas
│
├── docker-compose.yml                    # PostgreSQL en contenedor (opcional)
└── README.MD

---

## ✅ Requisitos previos

Antes de empezar, instala lo siguiente:

| Software | Versión mínima | Para qué |
|---|---|---|
| [Java JDK](https://adoptium.net/) | 17 | Compilar y ejecutar el backend |
| [Node.js](https://nodejs.org) | 18+ (LTS) | Ejecutar Angular |
| [PostgreSQL](https://www.postgresql.org/download/) | 14+ | Base de datos |
| [Maven](https://maven.apache.org/download.cgi) | 3.8+ | (Opcional — el proyecto incluye `mvnw`) |
| [Git](https://git-scm.com/) | Cualquiera | Clonar el repo |

**Alternativa con Docker** (si tienes Docker Desktop con virtualización habilitada): puedes saltarte la instalación manual de PostgreSQL usando el `docker-compose.yml` incluido.

---

## 🚀 Instalación paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/Guti-f/ICIFG003-EQ10.git
cd ICIFG003-EQ10
```

### 2. Configurar la base de datos

**Opción A — PostgreSQL instalado localmente** (recomendado)

Abre una terminal y conéctate a PostgreSQL:

```bash
psql -U postgres
```

Crea la base de datos:

```sql
CREATE DATABASE colegio_db;
\q
```

> ⚠️ Si tu usuario o contraseña de PostgreSQL **no son** `postgres` / `1234`, edita el archivo `backend/src/main/resources/application.properties` con tus credenciales.

**Opción B — Docker** (si tu equipo tiene virtualización habilitada)

```bash
docker-compose up -d
```

Esto levanta automáticamente PostgreSQL con la base `colegio_db` ya creada.

### 3. Backend

Abre una **nueva terminal** dentro de `backend/`:

```bash
cd backend
```

Ejecuta con Maven Wrapper (incluido en el proyecto):

**En Windows:**
```bash
mvnw.cmd spring-boot:run
```

**En Linux/Mac:**
```bash
./mvnw spring-boot:run
```

El backend quedará disponible en: **http://localhost:8080**

Al primer arranque se crearán automáticamente las tablas y 3 usuarios iniciales (ver sección "Usuarios").

### 4. Frontend

Abre **otra terminal** dentro de `frontend/`:

```bash
cd frontend
npm install
npm start
```

(`npm start` ejecuta `ng serve` internamente)

El frontend quedará disponible en: **http://localhost:4200**

### 5. Probar la aplicación

Abre tu navegador en: http://localhost:4200/

Verás la landing page. Click en "Iniciar sesión" y usa cualquiera de los usuarios precargados.

---

## 🔐 Usuarios precargados

Al arrancar el backend por primera vez se crean estos usuarios automáticamente:

| Usuario | Contraseña | Nombre |
|---|---|---|
| `admin` | `admin123` | Administrador |
| `lucas` | `1234` | Lucas Chong |

---

## 📋 Funcionalidades

### Equipo
- 🏠 **Landing page** — Presentación del sistema y el equipo
- 🔐 **Login** — Autenticación con sesión persistente (localStorage)
- 📊 **Menú principal** — Acceso a todas las funcionalidades (protegido por guard)

### CRUD individuales
- 👨‍👩‍👧 **Apoderados** (Lucas Chong) — Gestión de apoderados con campos: RUT, nombre, apellido, teléfono, email, relación con el alumno
- 👨‍🏫 **Profesores** (Gustavo Fernández) — Gestión de profesores con campos: RUT, nombre, apellido, email, teléfono, asignatura

### Funcionalidad de negocio (equipo)
- 📅 **Entrevistas** — Sistema completo para agendar entrevistas relacionando apoderado + profesor + fecha + motivo + estado (Programada / Realizada / Cancelada). Incluye observaciones y dropdowns dinámicos.

---

## 🌐 API REST — Endpoints

Todos los endpoints disponibles en `http://localhost:8080/api`:

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/login` | Login con `{username, password}` |

### Apoderados

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/apoderados` | Listar todos |
| GET | `/apoderados/{id}` | Obtener uno por id |
| POST | `/apoderados` | Crear |
| PUT | `/apoderados/{id}` | Actualizar |
| DELETE | `/apoderados/{id}` | Eliminar |

### Profesores

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/profesores` | Listar todos |
| GET | `/profesores/{id}` | Obtener uno por id |
| POST | `/profesores` | Crear |
| PUT | `/profesores/{id}` | Actualizar |
| DELETE | `/profesores/{id}` | Eliminar |

### Entrevistas

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/entrevistas` | Listar todas (con apoderado y profesor anidados) |
| GET | `/entrevistas/{id}` | Obtener una por id |
| POST | `/entrevistas` | Crear |
| PUT | `/entrevistas/{id}` | Actualizar |
| DELETE | `/entrevistas/{id}` | Eliminar |

---

## 🏗️ Arquitectura del frontend

El frontend sigue una arquitectura modular **feature-based** con principios modernos de Angular:

- **Standalone components** (sin NgModules)
- **Signals** para manejo de estado reactivo
- **Reactive Forms** con validaciones
- **Lazy loading** de features (las páginas se descargan solo cuando se accede)
- **Auth Guard** para proteger rutas privadas
- **Separación clara** entre service (HTTP), store (estado) y components (UI)

---

## 🧪 Probar el backend con curl

Ejemplo para crear un apoderado:

```bash
curl -X POST http://localhost:8080/api/apoderados \
  -H "Content-Type: application/json" \
  -d '{"rut":"12345678-9","nombre":"Juan","apellido":"Perez","telefono":"+56912345678","email":"juan@mail.com","relacion":"Padre"}'
```

---

## ⚠️ Solución de problemas comunes

**El backend no arranca: "database does not exist"**
→ Crea la base `colegio_db` con `CREATE DATABASE colegio_db;` en psql.

**El backend no arranca: "password authentication failed"**
→ Tu usuario/contraseña de PostgreSQL no coincide con `postgres/1234`. Edita `application.properties`.

**El frontend muestra "Cannot find module"**
→ Ejecuta `npm install` dentro de la carpeta `frontend/`.

**Error CORS al hacer login**
→ Verifica que el backend esté corriendo en el puerto 8080.

**Página en blanco al cargar Angular**
→ Abre la consola del navegador (F12). Si dice algo de "Zone.js", revisa `app.config.ts` que use `provideZonelessChangeDetection()`.

---

## 📝 Licencia

Proyecto académico — Universidad San Sebastián, 2026.
