
// Importar dependencias necesarias
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require('bcrypt');
const cors = require('cors');

// Crear una instancia de la aplicación Express
const app = express();
const port = 3000; 
// Configuración del middleware para analizar los cuerpos de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

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

//PROVEEDORES

// Definir el esquema y el modelo de Proveedor
const proveedorSchema = new mongoose.Schema({
  name: String,
  contact: String,
  phone: String,
  email: String
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

// Rutas
app.post('/api/proveedores', async (req, res) => {
  try {
      const proveedor = new Proveedor(req.body);
      await proveedor.save();
      res.status(201).json(proveedor);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

app.get('/api/proveedores', async (req, res) => {
  try {
      const proveedores = await Proveedor.find();
      res.json(proveedores);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

app.delete('/api/proveedores/:id', async (req, res) => {
  try {
      await Proveedor.findByIdAndDelete(req.params.id);
      res.status(204).end();
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

//PRODUCTOS

const productoSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  description: String,
  price: Number,
  category: String,
  receptiondate: Date
});

const Producto = mongoose.model('Producto', productoSchema);

// Rutas
app.post('/api/productos', async (req, res) => {
  try {
      const producto = new Producto(req.body);
      await producto.save();
      res.status(201).json(producto);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

app.get('/api/productos', async (req, res) => {
  try {
      const productos = await Producto.find();
      const lowStockProducts = productos.filter(producto => producto.quantity < 2);
      if (lowStockProducts.length > 0) {
          console.log('Alerta: algunos productos tienen una cantidad menor a 2:', lowStockProducts);
      }
      res.json(productos);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

app.put('/api/productos/:id', async (req, res) => {
  try {
      const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(producto);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

app.delete('/api/productos/:id', async (req, res) => {
  try {
      await Producto.findByIdAndDelete(req.params.id);
      res.status(204).end();
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

app.get('/api/productos/:id', async (req, res) => {
  try {
      const producto = await Producto.findById(req.params.id);
      if (!producto) {
          return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(producto);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});


////// PARA PROBAR QUE EL PUERTO ESTA FUNCIONANDO
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

