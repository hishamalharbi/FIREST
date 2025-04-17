import Customer from '../models/Customer.js';

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: 'فشل في جلب العملاء', error: err.message });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json({ message: 'تم إضافة العميل', customer });
  } catch (err) {
    res.status(500).json({ message: 'فشل في إضافة العميل', error: err.message });
  }
};
