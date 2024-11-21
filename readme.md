# Obligatorio BD

## Descripción

Este proyecto es una aplicación de gestión de una escuela de deportes.

## Requisitos

- Node.js
- npm

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/mathiassellanes/BD_Obligatorio
    cd BD_Obligatorio
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Crea y configura el archivo `.env` en la raíz del proyecto con las siguientes variables:
    ```env
   SECRET_KEY= Tu secret key
    DB_HOST= El host de tu servidor de base de datos
    DB_USER= El usuario con acceso a la base
    DB_PORT= Puerto del servidor
    DB_PASSWORD= La contraseña del usuario
    DB_NAME= Nombre de la base de datos
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
