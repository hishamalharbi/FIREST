import Order from '../models/Order.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer').populate('items.product').sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'فشل في جلب الطلبات', error: err.message });
  }
};

export const getOrdersForMerchant = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product').sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'فشل في جلب الطلبات للتاجر', error: err.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'تم إنشاء الطلب', order });
  } catch (err) {
    res.status(500).json({ message: 'فشل في إنشاء الطلب', error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'فشل في تحديث حالة الطلب', error: err.message });
  }
};
