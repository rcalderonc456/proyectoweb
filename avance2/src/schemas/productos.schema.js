import { z } from "zod";

export const createProductSchema = z.object({
    id_producto: z.string({ required_error: "El ID del producto es obligatorio" }),
    nombre_producto: z.string({ required_error: "El nombre del producto es obligatorio" }),
    descripcion: z.string({ required_error: "La descripción es obligatoria" }),
    cantidad: z.number({ required_error: "La cantidad es obligatoria" }),
    precio: z.number({ required_error: "El precio es obligatorio" }),
    id_proveedor: z.string({ required_error: "El ID del proveedor es obligatorio" })
});