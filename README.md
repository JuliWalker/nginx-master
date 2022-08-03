## 1. Comienzo

**npm intall** para instalar todas las dependencias
Para utilizar **PM2** instalarlo globalmente **npm i -g pm2**

## 2. Funcionamiento - Cluster Node Nativo

**npm run fork** - levanta el servidor en modo Fork en el puerto 8080
probar con [localhost:8080](http://localhost:8080 "localhost:8080")

**npm run cluster** - levanta el servidor en modo cluster en el puerto 8081
probar con [localhost:8081/datos](http://localhost:8081/datos "localhost:8081/datos")

## 3. Utilizacion de NGINX

Configurar el archivo **nginx.conf** con las configuraciones del archivo **Nginx_2_puertos.txt**. Luego en terminal (probado en ubuntu) correr el siguiente comando **sudo nginx**

Una vez puesto en funcionamiento el proxy probar con : [localhost](http://localhost "localhost") y [localhost/datos](http://localhost/datos "localhost/datos")
Para detener el proxy utilizar el siguiente comando **sudo nginx -s stop**

## 4. Funcionamiento con PM2

##### Levantar servidor Modo Fork puerto 8080

`PORT=8080 pm2 start src/server.js --name="Servidor1" --watch`

**aclaracion**: (--) son 2 guiones medios

---

##### Levantar servidor Modo Cluster puerto 8081

`PORT=8081 pm2 start src/server.js --name="Servidor2" --watch -i max`

**aclaracion**: (--) son 2 guiones medios

Para ver los servidores creados utilizar el comando `pm2 list` en terminal
y probar las peticiones realizadas con `pm2 monit`

Probar con [localhost:8080](http://localhost:8080 "localhost:8080") - [localhost:8081/datos](http://localhost:8081/datos "localhost:8081/datos")

Para utlizar con **NGINX** hacer lo mismo que en el punto 3

## 5. Funcionamiento PM2 Varios clusters y puertos distintos

Modificar el archivo **nginx.conf** con las configuraciones que estan en el archivo **Nginx_5_puertos.txt**

##### Levantar Servidores:

- Modo Fork : `PORT=8080 pm2 start src/server.js --name="servidor1" --watch`
- Modo Cluster : `PORT=8082 pm2 start src/server.js --name="servidor2" --watch -i 1`
- Modo Cluster : `PORT=8083 pm2 start src/server.js --name="servidor3" --watch -i 1`
- Modo Cluster : `PORT=8084 pm2 start src/server.js --name="servidor4" --watch -i 1`
- Modo Cluster : `PORT=8085 pm2 start src/server.js --name="servidor5" --watch -i 1`

**Levantar Proxy Nginx con el siguiente comando** `sudo nginx`

##### Probar funcionamiento con [localhost](http://localhost "localhost") y [localhost/datos](http://localhost/datos "localhost/datos")

Podemos ver los servidores con el comando `pm2 list` y ver las peticiones realizadas a cada puerto de cada servidor con `pm2 monit`

#### Importante

Todos los comandos fueron probados con terminal de **Ubuntu**, levantar los servidores desde la ruta raiz del proyecto
