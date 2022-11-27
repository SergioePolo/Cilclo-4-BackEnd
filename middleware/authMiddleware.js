const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //leer el token desde el header de postman
  const token = req.header("x-auth-token");
  //console.log(token);

  //revisar si hay token
  if (!token) {
    return res.status(400).json({ msg: "No hay token" });
  }

  //validar el token

  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.usuario = cifrado.usuario;
    //console.log(cifrado.usuario);
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token not valid" });
  }
};
