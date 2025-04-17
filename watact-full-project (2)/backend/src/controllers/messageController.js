import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversation: req.params.id }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'فشل في جلب الرسائل', error: err.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const message = new Message({
      conversation: req.params.id,
      ...req.body,
      timestamp: new Date()
    });
    await message.save();
    res.status(201).json({ message: 'تم إرسال الرسالة', data: message });
  } catch (err) {
    res.status(500).json({ message: 'فشل في إرسال الرسالة', error: err.message });
  }
};
