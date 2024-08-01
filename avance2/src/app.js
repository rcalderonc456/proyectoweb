import express from 'express';
import morgan from 'morgan';

//IMPORTAR RUTAS

import productRoutes from "./routes/productos.routes.js";
import proveedorRoutes from "./routes/proveedores.routes.js"


import cookieParser from 'cookie-parser';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//POST localhost:4000/api/

app.use("/api", productRoutes);
app.use('/api/', proveedorRoutes);

export default app;

