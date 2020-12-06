# Punto de venta
Se trata de una sencilla aplicación web que puede manipula la base de datos por medio de CRUDs y es compatible con scanners que generan un espacio entre cada lectura.


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
    - Server default port: 3000;
    - MySQL default password: secret
    
# Tech
La aplicación hace uso de multiples tecnologias y herramientas open source:
* Angular
* Node.js
* TypeScript
* Bootstrap
* Express
* MySQL
* JWT
* SweatAlert2
