import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productos.controllers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProductSchema } from "../schemas/productos.schema.js";

const router = Router();

router.get('/productos', authRequired, getProducts);
router.get('/productos/:id', authRequired, getProduct);
router.post('/productos', authRequired, validateSchema(createProductSchema), createProduct);
router.put('/productos/:id', authRequired, updateProduct);
router.delete('/productos/:id', authRequired, deleteProduct);

export default router;