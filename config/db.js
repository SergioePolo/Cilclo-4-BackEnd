const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://spolo:3lb4l0n3a@cluster0.t6qdx0z.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`mongodb conectado en: ${url}`);
  } catch (e) {
    console.log(`error: ${e.message}`);
    process.exit(1);
  }
};

module.exports = conectarDB;
