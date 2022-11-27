const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

exports.autenticarUsuario = async (req, res) => {
  const { password, email } = req.body;
  try {
    //revisar correo este registrado
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    //validar la constraseña
    const passwordCorrecto = await bcryptjs.compare(password, usuario.password);

    if (!passwordCorrecto) {
      return res.status(404).json({ msg: "password incorrect" });
    }

    //Si todo es correcto: crear y firmar un token
    let payload = {
      usuario: { id: usuario.id },
    };
    //res.json(payload);
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: "1m", //1 minuto
      },
      (error, token) => {
        if (error) throw error;
        //mensaje confirmacion
        res.json(token);
      }
    );
  } catch (e) {
    console.log(e);
  }
};

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    res.json({ usuario });
  } catch (e) {
    res.status(403).json({ msg: "Hubo un error" });
  }
};
