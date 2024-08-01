import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getProveedores, getProveedor, createProveedor, updateProveedor, deleteProveedor } from "../controllers/proveedores.controllers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProveedorSchema } from "../schemas/proveedores.schema.js";

const router = Router();

router.get('/proveedores', authRequired, getProveedores);
router.get('/proveedores/:id', authRequired, getProveedor);
router.post('/proveedores', authRequired, validateSchema(createProveedorSchema), createProveedor);
router.put('/proveedores/:id', authRequired, updateProveedor);
router.delete('/proveedores/:id', authRequired, deleteProveedor);

export default router;