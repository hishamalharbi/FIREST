import mongoose from 'mongoose';

const specificationSchema = new mongoose.Schema({
  key: String,
  value: String
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  isAvailable: { type: Boolean, default: true },
  images: [String],
  specifications: [specificationSchema]
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
