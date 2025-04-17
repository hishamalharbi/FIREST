import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  sender: String,
  content: String,
  contentType: String,
  timestamp: Date,
  isRead: Boolean
});

export default mongoose.model('Message', messageSchema);
