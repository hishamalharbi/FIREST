import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'فشل في جلب المنتجات', error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'تم إضافة المنتج', product });
  } catch (err) {
    res.status(500).json({ message: 'فشل في إنشاء المنتج', error: err.message });
  }
};
