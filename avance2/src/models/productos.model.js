import mongoose from 'mongoose';


const productSchema = new mongoose.Schema(
    {
    id_producto: { 
        type: String, 
        required: true },

    nombre_producto: { 
        type: String, 
        required: true },

    descripcion: { 
        type: String, 
        required: true },

        cantidad:{
            type: Number,
            required: true
        },
        precio:{
            type: Number,
            requiered: true
        },

        id_proveedor:{
             type: mongoose.Schema.Types.ObjectId,
            ref: 'Proveedor',
            required: true
        }

}, {
    timestamps: true
});

export default mongoose.model("Product", productSchema);