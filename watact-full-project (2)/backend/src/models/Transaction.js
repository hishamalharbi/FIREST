import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  amount: Number,
  paymentMethod: String,
  status: String,
  transactionId: String
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
