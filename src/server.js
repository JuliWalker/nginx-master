import express from "express";
import morgan from "morgan";
import os from "os";
import cluster from "cluster";

const PORT = process.env.PORT;
// esto se pasa por consola o esta definido en los scripts de pakage.json cuando corremos "fork" y "Cluster"
const MODO = process.argv[2];
// revisar como funciona esta parte de argv
const numCPU = os.cpus().length;
const app = express();

app.use(morgan("dev"));

if (MODO === "cluster" && cluster.isPrimary) {
  for (let i = 0; i < numCPU; i++) {
    cluster.fork();
  }
} else {
  app.get("/", (req, res) => {
    if (MODO !== "cluster") {
      res.send(`Servidor en modo Fork Puerto =${PORT}, PID = ${process.pid}`);
    } else {
      res.send(
        `Servidor en modo cluster Puerto =${PORT}, PID = ${process.pid}`
      );
    }
  });
  app.get("/datos", (req, res) => {
    res.send(
      `Ruta datos, modo cluster , puerto = ${PORT} , PID = ${process.pid}, procesadores = ${numCPU}`
    );
  });

  const server = app.listen(PORT);
  server.emit(console.log(`Server on port ${PORT}...`));
  server.on("error", (err) => {
    console.log(`Error en conexion: ${err}`);
  });
}
