import Product from '../models/productos.model.js';

// Obtener todos los productos
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('id_proveedor');
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const { id_producto, nombre_producto, descripcion, cantidad, precio, id_proveedor } = req.body;

        const newProduct = new Product({
            id_producto,
            nombre_producto,
            descripcion,
            cantidad,
            precio,
            id_proveedor
        });

        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
};

// Obtener un producto por su ID
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('id_proveedor');
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener producto' });
    }
};

// Actualizar un producto por su ID
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
};

// Eliminar un producto por su ID
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
};