const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // Puedes cambiar el puerto si es necesario

// Conectar a MongoDB sin opciones obsoletas
mongoose.connect('mongodb+srv://marcelamedranoz55:ucrB9Nr2irIQWL3k@pfgrup5.2bokdh9.mongodb.net/', {
    // Ya no es necesario incluir useNewUrlParser y useUnifiedTopology
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Conectado a MongoDB');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Definir el esquema y el modelo de Producto
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

app.delete('/api/productos/:id', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});