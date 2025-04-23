# Sistema de Evaluación 360 Grados - API RESTful

API RESTful para un sistema de evaluación 360 grados de empleados remotos en una empresa de desarrollo de aplicaciones.
## 📑 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Tests](#-tests)
- [API Endpoints](#-api-endpoints)
- [Colección de Endpoints](#-colección-de-endpoints)
- [Git](#git)

## 🚀 Características

- **Gestión de usuarios con roles**: Admin, Manager y Employee
- **Autenticación y autorización**: Sistema JWT para autenticación segura
- **Gestión de empleados**: Administración de perfiles de empleados
- **Sistema de evaluaciones**: Diferentes tipos de evaluaciones (360, autoevaluación, pares, etc.)
- **Preguntas y respuestas**: Sistema flexible de preguntas y categorías
- **Reportes detallados**: Por empleado y por departamento
- **Cálculo automático de puntuaciones**: Ponderadas según tipo de evaluación
- **Documentación Swagger**: Documentación interactiva de la API
- **Tests automatizados**: Cobertura de tests unitarios e integración

## 💻 Tecnologías Utilizadas

- **Backend**:
    - [Node.js](https://nodejs.org/) - Entorno de ejecución
    - [Express.js](https://expressjs.com/) v4.18.2 - Framework web
    - [MongoDB](https://www.mongodb.com/) - Base de datos NoSQL
    - [Mongoose](https://mongoosejs.com/) v8.1.3 - ODM para MongoDB
    - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) v9.0.2 - Tokens para autenticación
    - [express-validator](https://express-validator.github.io/) v7.0.1 - Validación de datos
    - [bcryptjs](https://www.npmjs.com/package/bcryptjs) v3.0.2 - Encriptación de contraseñas
    - [helmet](https://helmetjs.github.io/) v8.1.0 - Seguridad HTTP
    - [cors](https://www.npmjs.com/package/cors) v2.8.5 - Middleware CORS
    - [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) v7.1.5 - Limitador de peticiones
    - [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) v6.2.8 - Generación de documentación
    - [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) v5.0.1 - UI para documentación

- **Desarrollo y Testing**:
    - [Jest](https://jestjs.io/) v29.7.0 - Framework de testing
    - [Supertest](https://www.npmjs.com/package/supertest) v7.1.0 - Testing de API
    - [Nodemon](https://nodemon.io/) v3.1.9 - Recarga automática en desarrollo
    - [Morgan](https://www.npmjs.com/package/morgan) v1.10.0 - Logging de HTTP
    - [dotenv](https://www.npmjs.com/package/dotenv) v16.5.0 - Variables de entorno

## 📂 Estructura del Proyecto

```
evaluacion-360-api/
├── src/                     # Código fuente
│   ├── config/              # Configuraciones
│   │   ├── app.js           # Configuración de Express
│   │   ├── database.js      # Conexión a MongoDB
│   │   └── swagger.js       # Configuración de Swagger
│   ├── controllers/         # Controladores de la API
│   │   ├── auth.controller.js
│   │   ├── employee.controller.js
│   │   ├── evaluation.controller.js
│   │   ├── question.controller.js
│   │   └── report.controller.js
│   ├── middlewares/         # Middlewares
│   │   ├── auth.middleware.js        # Autenticación y autorización
│   │   ├── error.middleware.js       # Manejo de errores
│   │   ├── rateLimit.middleware.js   # Limitación de peticiones
│   │   └── validators/               # Validadores
│   │       ├── auth.validator.js
│   │       ├── employee.validator.js
│   │       ├── evaluation.validator.js
│   │       └── question.validator.js
│   ├── models/              # Modelos de datos
│   │   ├── user.model.js
│   │   ├── employee.model.js
│   │   ├── evaluation.model.js
│   │   ├── question.model.js
│   │   └── response.model.js
│   ├── repositories/        # Patrón repositorio
│   │   ├── base.repository.js
│   │   ├── user.repository.js
│   │   ├── employee.repository.js
│   │   ├── evaluation.repository.js
│   │   ├── question.repository.js
│   │   └── response.repository.js
│   ├── routes/              # Rutas de la API
│   │   ├── auth.routes.js
│   │   ├── employee.routes.js
│   │   ├── evaluation.routes.js
│   │   ├── question.routes.js
│   │   └── report.routes.js
│   ├── services/            # Servicios (lógica de negocio)
│   │   ├── auth.service.js
│   │   ├── employee.service.js
│   │   ├── evaluation.service.js
│   │   ├── question.service.js
│   │   ├── response.service.js
│   │   └── report.service.js
│   ├── utils/               # Utilidades
│   │   ├── appError.js            # Clase para errores
│   │   ├── catchAsync.js          # Wrapper para async/await
│   │   ├── validateResult.js      # Validación de resultados
│   │   ├── evaluationFactory.js   # Factory para evaluaciones
│   │   └── scoreCalculatorFactory.js  # Factory para calculadores
│   └── index.js             # Punto de entrada
├── tests/                   # Tests
│   ├── setup.js             # Configuración para tests
│   ├── auth.controller.test.js
│   └── employee.controller.test.js
├── api.http/                # Documentación endpoints
├── .env.example             # Plantilla de variables de entorno
├── .gitignore               # Archivos ignorados por Git
├── package.json             # Dependencias y scripts
├── Dockerfile               # Generacion de Imagen mongoDB
├── Docker-compose.yml       # Levantar mongoDB en local
└── README.md                # Este archivo
```

## 📋 Requisitos Previos

- **Node.js** (v14 o superior)
- **MongoDB** (v4.4 o superior)
- **pnpm** (v6 o superior)

## 🔧 Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd evaluacion-360-api
   ```

2. **Instalar dependencias**:
   ```bash
   pnpm install
   ```

## ⚙️ Configuración

1. **Crear archivo .env**:
   ```bash
   cp .env.example .env
   ```

2. **Configurar variables de entorno**:
   Edita el archivo `.env` con tus propias configuraciones:

   ```env
   # Entorno
   NODE_ENV=development
   
   # Servidor
   PORT=3000
   
   # Base de datos
   MONGODB_URI=mongodb://localhost:27017/evaluacion360
   
   # JWT
   JWT_SECRET=tu_clave_secreta_aqui
   JWT_EXPIRES_IN=1d
   ```

3. **Configuraciones específicas para test**:

   Crea un archivo `.env.test` para configuraciones de test:
   ```env
    JWT_EXPIRES_IN=1d
    PORT=3000
    MONGODB_URI=mongodb://admin:password123@localhost:27017/evaluation360?authSource=admin
    JWT_SECRET=13cdb7eb98e84f6489ea6ed00cd4324b
    NODE_ENV=development
   ```

## 🚀 Ejecución

1. **Modo Desarrollo**:
   ```bash
   docker compose up
   pnpm run dev
   ```
   Esto iniciará el servidor con Nodemon, que reiniciará automáticamente cuando se detecten cambios.

2. **Modo Producción**:
   ```bash
   docker compose up
   pnpm start
   ```

3. **Verificar que el servidor está funcionando**:
    - Abrir el navegador: `http://localhost:3000/health`
    - Deberías ver un mensaje de estado `{"status":"success","message":"API operativa"}`

## 🧪 Tests

### Configuración de Tests

Los tests utilizan una base de datos MongoDB separada definida en el archivo `.env.test`. Asegúrate de que esta base de datos exista o se pueda crear.

### Ejecutar Tests

1. **Ejecutar todos los tests**:
   ```bash
   pnpm test
   ```

### Estructura de los Tests

- `tests/setup.js` - Configuración global para los tests
- `tests/auth.controller.test.js` - Tests para la autenticación
- `tests/employee.controller.test.js` - Tests para empleados

### Solución de problemas comunes con los tests

Si encuentras el error "open handle" en Jest, puedes solucionarlo de varias maneras:

1. **Usando agent en lugar de request**:
   ```javascript
   const agent = request.agent(app);
   const response = await agent.post('/api/auth/login').send({...});
   ```

2. **Cerrando explícitamente el servidor y la conexión a MongoDB**:
   ```javascript
   let server;
   
   beforeAll(async () => {
     server = createServer(app);
     server.listen();
   });
   
   afterAll(async () => {
     await new Promise((resolve) => server.close(resolve));
     await mongoose.connection.close();
   });
   ```

3. **Forzando la salida de Jest**:
   ```bash
   pnpm test -- --forceExit
   ```

## 🌐 API Endpoints

### Autenticación

| Método | Ruta | Descripción | Roles permitidos |
|--------|------|-------------|------------------|
| POST | `/api/auth/register` | Registrar nuevo usuario | Público |
| POST | `/api/auth/login` | Iniciar sesión | Público |

### Empleados

| Método | Ruta | Descripción | Roles permitidos |
|--------|------|-------------|------------------|
| GET | `/api/employees` | Listar todos los empleados | Admin, Manager |
| GET | `/api/employees/:id` | Obtener detalles de un empleado | Todos |
| POST | `/api/employees` | Crear nuevo empleado | Admin |
| PUT | `/api/employees/:id` | Actualizar información de empleado | Admin, Manager |

### Evaluaciones

| Método | Ruta | Descripción | Roles permitidos |
|--------|------|-------------|------------------|
| GET | `/api/evaluations` | Listar evaluaciones | Todos |
| GET | `/api/evaluations/:id` | Obtener detalles de una evaluación | Todos |
| POST | `/api/evaluations` | Crear nueva evaluación | Admin, Manager |
| PUT | `/api/evaluations/:id` | Actualizar evaluación | Admin, Manager |
| POST | `/api/evaluations/:id/submit` | Enviar evaluación completada | Todos |

### Preguntas

| Método | Ruta | Descripción | Roles permitidos |
|--------|------|-------------|------------------|
| GET | `/api/questions` | Listar preguntas | Todos |
| GET | `/api/questions/:id` | Obtener detalles de una pregunta | Todos |
| POST | `/api/questions` | Crear nueva pregunta | Admin |
| PUT | `/api/questions/:id` | Actualizar pregunta | Admin |

### Reportes

| Método | Ruta | Descripción | Roles permitidos |
|--------|------|-------------|------------------|
| GET | `/api/reports/employee/:id` | Generar reporte para un empleado | Admin, Manager |
| GET | `/api/reports/department/:id` | Generar reporte por departamento | Admin, Manager |


## 📝 Documentación de la API

La API está documentada utilizando Swagger, lo que proporciona una interfaz interactiva para explorar y probar los endpoints.

### Acceso a la documentación
Una vez que el servidor esté en funcionamiento, puedes acceder a la documentación en:
```
http://localhost:3000/api-docs
```

### Configuración de Swagger

La configuración de Swagger se encuentra en `src/config/swagger.js`:

```javascript
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Evaluación 360',
      version: '1.0.0',
      description: 'API RESTful para un sistema de evaluación 360 grados'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/models/*.js']
};
```

### Integración con la aplicación

Para habilitar Swagger en la aplicación, es necesario agregar las siguientes líneas en `src/config/app.js`:

```javascript
const { specs, swaggerUi } = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```

## 🔄 Colección de Endpoints

Para facilitar las pruebas de la API, se proporciona una colección .http con ejemplos de todas las peticiones.

### Ubicación
```
root/api.http
```

### Uso
La colección incluye peticiones para cada categoría de endpoints:
- Auth
- Employees
- Evaluations
- Questions
- Reports

Cada petición incluye ejemplos de body y parámetros necesarios.

## Git

Para todo el trabajo de repositorio  se utilizo git flow.
Uso de conventional commit para commits documentados. [Conventional commit](https://gist.github.com/vladeParica/ba779ebd19a84fa3b10c891dc19e6ebf)