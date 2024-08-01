import Proveedor from "../models/proveedores.model.js";

// Obtener todos los proveedores
export const getProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.json(proveedores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener proveedores' });
    }
};

// Crear un nuevo proveedor
export const createProveedor = async (req, res) => {
    try {
        const { id, nombre_proveedor, contacto, direccion } = req.body;

        const newProveedor = new Proveedor({
            id,
            nombre_proveedor,
            contacto,
            direccion
        });

        const savedProveedor = await newProveedor.save();
        res.json(savedProveedor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear proveedor' });
    }
};

// Obtener un proveedor por su ID
export const getProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) return res.status(404).json({ message: 'Proveedor no encontrado' });
        res.json(proveedor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener proveedor' });
    }
};

// Actualizar un proveedor por su ID
export const updateProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!proveedor) return res.status(404).json({ message: 'Proveedor no encontrado' });
        res.json(proveedor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar proveedor' });
    }
};

// Eliminar un proveedor por su ID
export const deleteProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
        if (!proveedor) return res.status(404).json({ message: 'Proveedor no encontrado' });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar proveedor' });
    }
};