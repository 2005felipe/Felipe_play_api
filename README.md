# Felipe Play API

API REST de la tienda de consolas Felipe Play. Construida con Node.js, Express y MySQL (Clever Cloud).

## Instalación
1. Clonar el repositorio y entrar a la carpeta.
2. Ejecutar `npm install`.
3. Crear un archivo `.env` en la raíz con las variables de abajo.
4. Ejecutar `node app.js`.

## Variables de entorno
| Variable | Descripción |
|---|---|
| DB_HOST | Host de la base de datos en Clever Cloud |
| DB_NAME | Nombre de la base de datos |
| DB_USER | Usuario |
| DB_PASSWORD | Contraseña |
| DB_PORT | Puerto (3306) |
| PORT | Puerto del servidor (3000) |

## Estructura
- `config/` conexión a MySQL y funciones de validación
- `models/` consultas SQL
- `controllers/` lógica y validaciones
- `routes/` definición de endpoints

## Endpoints
Recursos: `categorias`, `clientes`, `marcas`, `consolas`, `ventas`.

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/consolas/getConsolas | Listar |
| GET | /api/consolas/getConsola/:id | Obtener uno |
| POST | /api/consolas/postConsola | Crear |
| PUT | /api/consolas/putConsola/:id | Actualizar |
| DELETE | /api/consolas/deleteConsola/:id | Eliminar |

Las demás tablas siguen el mismo patrón:
- `/api/categorias/getCategorias`, `getCategoria/:id`, `postCategoria`, `putCategoria/:id`, `deleteCategoria/:id`
- `/api/clientes/getClientes`, `getCliente/:id`, `postCliente`, `putCliente/:id`, `deleteCliente/:id`
- `/api/marcas/getMarcas`, `getMarca/:id`, `postMarca`, `putMarca/:id`, `deleteMarca/:id`
- `/api/ventas/getVentas`, `getVenta/:id`, `postVenta`, `putVenta/:id`, `deleteVenta/:id`

## Códigos de respuesta
200 OK, 201 creado, 400 datos inválidos, 404 no encontrado, 409 duplicado o conflicto de llave foránea, 500 error interno.

## URL pública
(Se agrega después del despliegue)
