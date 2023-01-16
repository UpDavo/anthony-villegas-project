# Aplicación NestJS con autenticación JWT

Esta aplicación utiliza NestJS como framework para el desarrollo de aplicaciones en Node.js y JSON Web Tokens (JWT) para la autenticación de usuarios.

## Requisitos

- Node.js y npm (se recomienda la versión más reciente)
- Una base de datos (se utiliza cockroachdb para la conexión)

## Instalación

- Clona el repositorio en tu equipo: git clone https://github.com/updavo/anthony-villegas-project.git
- Entra en la carpeta del proyecto: cd anthony-villegas-project
- Instala las dependencias: npm install
- Crea un archivo .env en la raíz del proyecto con las variables de entorno necesarias (ver sección de configuración)
- Arranca el servidor: npm run start

## Configuración

La aplicación utiliza las siguientes variables de entorno:

- dbhost: Host de la base de datos.
- dbport: Puerto de la base de datos.
- dbusername: Nombre de usuario a usar en la base de datos.
- dbpassword: Contraseña utilizada para acceder a la base de datos.
- dbdatabase: Nombre de la base de datos
- PORT: puerto de ejecución.

## Uso

La aplicación tiene una ruta de inicio de sesión `/login` que acepta como parámetros el nombre de usuario y la contraseña. Si las credenciales son válidas, se genera un JWT que se debe incluir en el encabezado `Authorization` de las peticiones a rutas protegidas.

Ejemplo de petición de inicio de sesión:

```
POST /auth/login
Content-Type: application/json

{
  "username": "mi_usuario",
  "password": "mi_contraseña"
}
```

Ejemplo de respuesta:

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pX3VzdWFyaW8iLCJpYXQiOjE1Nzk5OTk5OTl"
}
```

Ejemplo de petición a una ruta protegida con el JWT incluido en el encabezado:

```
GET /ruta-protegida
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pX3VzdWFyaW8iLCJpYXQiOjE1Nzk5OTk5OTl
```

## Notas adicionales

- Asegúrate de cambiar la cadena secreta utilizada para firmar los JWT en producción por una cadena segura generada por ti.

## Ejemplos de funcionamiento (Retos)

Para los ejemplos es importante recalcar que ya fue generado el token de autenticación.

### Emulated Endpoint

![alt text](/assets/img/emulated_api.jpg?raw=true)

### Organization Endpoint

![alt text](/assets/img/get_organization.jpg?raw=true)

![alt text](/assets/img/set_organization.jpg?raw=true)

![alt text](/assets/img/update_organization.jpg?raw=true)

![alt text](/assets/img/delete_organization.jpg?raw=true)

### Metrics Endpoint

![alt text](/assets/img/get_metrics_per_tribu.png?raw=true)

![alt text](/assets/img/get_metrics_per_tribu_error.jpg?raw=true)

![alt text](/assets/img/get_metrics_per_tribu_download.jpg?raw=true)

## Licencia

El código de esta aplicación está disponible bajo la licencia MIT.