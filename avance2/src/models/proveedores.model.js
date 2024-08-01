import mongoose from 'mongoose';


const proveedorSchema = new mongoose.Schema(
    {
    id: { 
        type: String, 
        required: true },

    nombre_proveedor: { 
        type: String, 
        required: true },

    contacto: { 
        type: Number, 
        required: true },

        direccion:{
            type: String,
            required: true
        }
        
}, {
    timestamps: true
});

export default mongoose.model("Proveedor", proveedorSchema);