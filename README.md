# fraseandtisert (BACKEND)

fraseandtisert es un proyecto full-stack que proporciona una API para gestionar autenticaciones, usuarios, productos, pedidos y funcionalidades relacionadas.  
Este repositorio contiene exclusivamente el backend, que se encarga de:

- Manejar la lógica de negocio
- Conectarse y operar sobre la DB
- Gestionar autenticación y autorización
- Controlar el stock de productos y la cesta de compra
- Integrarse con servicios externos como Cloudinary para la gestión de imágenes

## Características principales

- Autenticación y autorización segura (registro, login, JWT, roles)
- Gestión de usuarios y perfiles (con productos favoritos)
- CRUD de productos con variantes (colores y tallas)
- Cesta de compras y procesamiento de pedidos
- Validación de stock en tiempo real
- Subida y eliminación de imágenes con Cloudinary
- API RESTful estructurada y mantenible
- Logging con morgan para desarrollo

## Tecnologías utilizadas

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** para autenticación
- **Cloudinary** para gestión de imágenes
- **bcryptjs**, **express-validator**
- **morgan** para logs HTTP en desarrollo

## Estructura del proyecto

```bash
/api
  /controllers       # Lógica de negocio
  /models            # Esquemas Mongoose
  /routes            # Rutas de la API
/config              # Configuración del proyecto y conexión a DB
/data                # Datos de ejemplo (users, products)
/middlewares         # Auth, validaciones, carga de archivos
/utils
  /functions         # Funciones utilitarias (JWT, Cloudinary...)
  /seeds             # Scripts para poblar la base de datos
```

## **Scripts**

**npm run dev**: Inicia el servidor.

```bash
npm run dev
```

**npm run mainSeed**: Carga los datos iniciales de usuarios y productos en la DB.

```bash
npm run mainSeed
```

**npm run local**: Inicia el servidor en local.

```bash
npm run local
```

## **Carpeta de datos (/data)**

Los datos de ejemplo para usuarios y productos están dentro de la carpeta data.
Los archivos usersData.js y productsData.js se usan con npm run mainSeed.

**Usuarios predeterminados**:

| userName | email                      | password  | role  |
| -------- | -------------------------- | --------- | ----- |
| Admin    | `admin@fraseandtisert.com` | Admin1234 | admin |
| Nico     | `nico@fraseandtisert.com`  | Nico1234  | user  |

## **Endpoints**

**Auth**
| Método | Ruta | Descripción |
| ------ | ----------------- | --------------------------------------- |
| GET | `/api/v1/auth` | Obtiene el token registrado y lo verifica con JWT. |
| POST | `/api/v1/auth/register` | Registro de usuario. |
| POST | `/api/v1/auth/login` | Login de usuario. |

**Users**
| Método | Ruta | Descripción |
| ------ | ----------------- | --------------------------------------- |
| GET | `/api/v1/users` | Obtiene todos los usuarios registrados. (admin)|
| GET | `/api/v1/users/:id` | Obtiene un usuario por Id. |
| PUT | `/api/v1/users/:id` | Actualiza los datos de un usuario. |
| DELETE | `/api/v1/users/:id` | Elimina un usuario. |

**Products**
| Método | Ruta | Descripción |
| ------ | ----------------- | --------------------------------------- |
| GET | `/api/v1/products/:slug` | Obtiene un producto por slug. |
| GET | `/api/v1/products` | Obtiene todos los productos. |
| GET | `/api/v1/products?category=` | Obtiene todos los productos filtrados por categoría. |
| POST | `/api/v1/products` | Crea un producto. (admin)|
| PUT | `/api/v1/products/:id` | Actualiza un producto. (admin) |
| DELETE | `/api/v1/products/:id` | Elimina un producto. (admin)|

**Cart**
| Método | Ruta | Descripción |
| ------ | ----------------- | --------------------------------------- |
| GET | `/api/v1/cart` | Obtiene la cesta del usuario.|
| POST | `/api/v1/cart` | crea y actualiza la cesta. |
| DELETE | `/api/v1/cart` | Borra toda la cesta. |
| POST | `/api/v1/cart/add-item` | Añade item seleccionado a la cesta. |
| POST | `/api/v1/cart/remove-item` | Elimina item seleccionado de la cesta. |

**Orders**
| Método | Ruta | Descripción |
| ------ | ----------------- | --------------------------------------- |
| GET | `/api/v1/orders` | Obtiene todos los pedidos. (admin)|
| GET | `/api/v1/orders/my-orders` | Obtiene los pedidos del usuario. |
| POST | `/api/v1/orders` | Añade el pedido y valida el stock de productos. |

**Favorites**
| Método | Ruta | Descripción |
| ------ | ----------------- | --------------------------------------- |
| GET | `/api/v1/favorites` | Obtiene los favoritos del usuario. |
| POST | `/api/v1/favorites/:productId` | Añade producto a favoritos. |
| DELETE | `/api/v1/favorites/:productId` | Elimina producto de favoritos. |

## **Middlewares**

**auth.js**

- **isAuth**: Verifica que el usuario esté autenticado mediante JWT.
- **isAdmin**: Verifica que el usuario sea administrador.

**file.js**
Middleware para subir imágenes a Cloudinary de forma segura.

## **Funciones clave**

**deleteFile**
Elimina imágenes de Cloudinary para liberar espacio.

**JWT**
Se utiliza para autenticar y proteger rutas privadas.

## **Notas**

Es una demo: el modelo de Order aún no implementa lógica real de pagos.

- shippingAddress: undefined,
- status: "pending",
- paidAt: undefined

## **Repositorio Frontend**

Este backend tiene un frontend completo disponible en otro repositorio [FRONT-proyecto-13-fraseandtisert](https://github.com/marugandev/FRONT-proyecto-13-fraseandtisert.git).
