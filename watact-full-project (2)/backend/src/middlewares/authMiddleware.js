import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'الرجاء تسجيل الدخول أولاً' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // يحتوي على id و role
    next();
  } catch (err) {
    return res.status(401).json({ message: 'رمز المصادقة غير صالح أو منتهي' });
  }
};

export default authMiddleware;
