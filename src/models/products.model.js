import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    description: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    category: { type: String, required: true }, 
    stock: { type: Number, required: true, default: 0 }, 
    images: [{ type: String }], 
    status: { type: Boolean, default: true }, 
    createdAt: { type: Date, default: Date.now }, 
    updatedAt: { type: Date, default: Date.now }, 
});


productSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model('Product', productSchema);
