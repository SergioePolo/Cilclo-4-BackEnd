const express = require("express");
const conectarDB = require("./config/db");
const usuarioRouters = require("./routers/usuarioRouters");
const authRouters = require("./routers/authRouters");
//Conectar a la base de datos
conectarDB();

const app = express();
//Habilitar express.json

app.listen(4000, () => {});
app.use(express.json({ extended: true }));
//rutas o routers
app.use("/api/usuarios", usuarioRouters);
app.use("/api/auth", authRouters);
