import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: String,
  paymentStatus: String,
  paymentMethod: String,
  shippingAddress: String
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
