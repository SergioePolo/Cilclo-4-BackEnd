const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

exports.crearUsuario = async (req, res) => {
  //console.log(req.body);
  const { password, email } = req.body;
  try {
    //revisar correo unico
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya ha sido creado" });
    }

    //crear nuevo usuario
    usuario = new Usuario(req.body);
    //hash
    usuario.password = await bcryptjs.hash(password, 10);
    //guardar usuario en la base de datos
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (e) {
    console.log(e);
  }
};
