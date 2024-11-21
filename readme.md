# Obligatorio BD

## Descripción

Este proyecto es una aplicación de gestión de una escuela de deportes.

## Requisitos

- Node.js
- npm

## Instalación

1. Clona el repositorio:
    ```sh
    git clone <URL_DEL_REPOSITORIO>
    cd obligatorio-bd
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Crea y configura el archivo `.env` en la raíz del proyecto con las siguientes variables:
    ```env
    DB_HOST=localhost
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    ```

## Levantar la base de datos

Para crear la base de datos y ejecutar las migraciones y semillas, ejecuta el siguiente comando:
```sh
npm run db_create
```

## Ejecutar la aplicación

Para iniciar la aplicación, ejecuta:
```sh
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## Linter

Para ejecutar el linter, usa:
```sh
npm run lint
```

Para ejecutar el linter y corregir automáticamente los problemas, usa:
```sh
npm run lint:fix
```
