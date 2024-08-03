
// Importar dependencias necesarias
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require('bcrypt');

// Crear una instancia de la aplicación Express
const app = express();
// Configuración del middleware para analizar los cuerpos de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar a MongoDB
mongoose.connect('mongodb+srv://marcelamedranoz55:ucrB9Nr2irIQWL3k@pfgrup5.2bokdh9.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});


// Modelo de usuario // Definir el esquema para los usuarios en MongoDB
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Crear un modelo de usuario basado en el esquema
const User = mongoose.model('User', userSchema);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta principal para servir el archivo HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// Ruta para manejar el registro de usuarios
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send("Usuario registrado con éxito");
  } catch (err) {
    res.status(400).send("Error al registrar usuario");
  }
});

////  Autenticación del inicio de sesión 
// Ruta para manejar el inicio de sesión
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.send("Inicio de sesión exitoso");
    } else {
      res.status(401).send("Correo o contraseña incorrectos");
    }
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});

////// PARA PROBAR QUE EL PUERTO ESTA FUNCIONANDO
app.listen(3006, () => {
  console.log("Server running on port", 3006);
});
