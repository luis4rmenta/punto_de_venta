# Punto de venta
Se trata de una sencilla aplicación web que puede manipular la base de datos por medio de CRUDs y es compatible con scanners que generan un espacio entre cada lectura.

## Advertencia: Este proyecto puede no contener las mejores practicas ni la mejor implementación. Se deben aceptar los errores y evitar cometerlos en el futuro, este código no es sostenible y requerira mucho tiempo para reformarlo.

Nota: La aplicación sigue en desarrollo, hace falta agregar pruebas unitarias e integrales, crear la configuración que se utilizará para la producción, organizar métodos usados, solucionar problemas de overfetching y underfetching y arreglar algunos bugs.


# Installation

Requiere [Node.js](https://nodejs.org/) v12+ para funcionar como fue planeado.
#### Sin docker
Una ves instalado Node.js es hora de comenzar la instalación.
importa el schema de la base de datos que se encuentra en /database
```sh
mysql> CREATE DATEBASE punto_de_venta;
$ mysql -u <user> -p punto_de_venta < schema.sql
```
Instala las dependencias
```sh
$ cd server/
$ npm install
```
Inicia el servidor
```sh
$ npm run dev
```
Instala las dependencias de angular e inicia el servidor de desarrollo
```sh
$ cd client/canningCart/
$ npm install
$ ng serve
```
### Con Docker
Utilizar docker hará más fácil inicar el proyecto, solo utiliza docker-compose, carga la base de datos e inicia el servidor de desarrollo:
```sh
$ docker-compose up
$ docker exec -it <container> bash
mysql> CREATE DATABASE punto_de_venta;
container/# mysql -p punto_de_venta < docker-entrypoint-initdb.d/schema.sql
$ cd client/canningCart
$ npm install
$ npm run dev
```
notes:
    * Server default port: 3000;
    * MySQL default password: secret
    * Los usuarios ya creados se pueden consultar dentro de la DB punto_de_venta en la tabla usuarios; un usuarios administrador es user: admin password: password
    
# Tecnologías
La aplicación hace uso de multiples tecnologias y herramientas open source:
* Angular
* Node.js
* TypeScript
* Bootstrap
* Express
* MySQL
* JWT
* SweatAlert2
