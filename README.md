<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar 
```
npm install
```
3. Tener nest cli intalado
```
npm install -g @nestjs/cli
```
4. Levntar la base de datos
```
docker-compose up -d 
```
5. Clonar el archivo _.env.template_ y renombrar la copia a _.env_

6. Llenar las variables de entorno definidas en el _.env_

7. Ejecutar la aplicacion en dev: 
```
npm run start:dev
```

8. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```
## Stack usado

* MongoDB
* Nest
