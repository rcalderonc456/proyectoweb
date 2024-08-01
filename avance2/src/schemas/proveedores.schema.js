import { z } from "zod";

export const createProveedorSchema = z.object({
    id: z.string({ required_error: "El ID del proveedor es obligatorio" }),
    nombre_proveedor: z.string({ required_error: "El nombre del proveedor es obligatorio" }),
    contacto: z.number({ required_error: "El contacto es obligatorio" }),
    direccion: z.string({ required_error: "La dirección es obligatoria" })
});