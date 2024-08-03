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

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
