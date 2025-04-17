import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  address: String,
  totalOrders: Number,
  totalSpent: Number,
  lastOrderDate: Date,
  status: String
}, { timestamps: true });

export default mongoose.model('Customer', customerSchema);
