import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Message from '../models/Message.js';

dotenv.config();

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  }
});

client.on('qr', (qr) => {
  console.log('🔑 امسح هذا الكود لربط واتساب:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('🤖 البوت الذكي جاهز للعمل!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/watact', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ تم الاتصال بقاعدة البيانات من البوت');
}).catch(err => {
  console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err.message);
});

// Helper to save message log
const saveMessage = async (msg, isBot = false) => {
  try {
    await Message.create({
      conversation: msg.from,
      sender: isBot ? 'bot' : 'client',
      content: msg.body,
      contentType: 'text',
      timestamp: new Date(),
      isRead: true
    });
  } catch (e) {
    console.error('⚠️ فشل حفظ الرسالة:', e.message);
  }
};

client.on('message', async (msg) => {
  const message = msg.body.toLowerCase();
  await saveMessage(msg);

  if (message.includes('منتجات') || message.includes('product')) {
    try {
      const products = await Product.find().limit(5);
      if (products.length === 0) {
        msg.reply('🚫 لا توجد منتجات متاحة حاليًا.');
        await saveMessage({ ...msg, body: '🚫 لا توجد منتجات متاحة حاليًا.' }, true);
        return;
      }

      let reply = '🛍️ هذه قائمة من منتجاتنا:
';
      products.forEach((p, i) => {
        reply += `${i + 1}. ${p.name} - ${p.price} ريال
`;
      });
      msg.reply(reply);
      await saveMessage({ ...msg, body: reply }, true);
    } catch (err) {
      msg.reply('⚠️ حدث خطأ أثناء جلب المنتجات.');
      await saveMessage({ ...msg, body: '⚠️ حدث خطأ أثناء جلب المنتجات.' }, true);
    }

  } else if (message.includes('طلب') || message.includes('order')) {
    try {
      const parsed = msg.body.match(/طلب[:：]?\s*(.+)،\s*(\d+) حبة،\s*(.+)/i);
      if (!parsed || parsed.length < 4) {
        msg.reply('📦 الرجاء إرسال الطلب بهذا الشكل:
طلب: اسم المنتج، 2 حبة، الرياض');
        await saveMessage({ ...msg, body: '📦 الرجاء إرسال الطلب بهذا الشكل:
طلب: اسم المنتج، 2 حبة، الرياض' }, true);
        return;
      }

      const [_, productName, qtyStr, address] = parsed;
      const product = await Product.findOne({ name: { $regex: productName, $options: 'i' } });

      if (!product) {
        msg.reply('❌ المنتج غير موجود');
        await saveMessage({ ...msg, body: '❌ المنتج غير موجود' }, true);
        return;
      }

      const quantity = parseInt(qtyStr);
      const total = quantity * product.price;

      const order = await Order.create({
        customer: null, // يمكنك ربطه لاحقًا بـ Customer إذا تم تطوير النظام أكثر
        items: [{
          product: product._id,
          quantity,
          price: product.price
        }],
        total,
        status: 'قيد المعالجة',
        paymentStatus: 'لم يتم الدفع',
        paymentMethod: 'واتساب',
        shippingAddress: address
      });

      const reply = `✅ تم تسجيل طلبك بنجاح لمنتج "${product.name}" (${quantity} × ${product.price} ريال).
الإجمالي: ${total} ريال
سيتم التواصل معك قريبًا.`;
      msg.reply(reply);
      await saveMessage({ ...msg, body: reply }, true);
    } catch (err) {
      console.error('❌ خطأ أثناء معالجة الطلب:', err.message);
      msg.reply('⚠️ فشل في تسجيل الطلب. حاول مرة أخرى.');
      await saveMessage({ ...msg, body: '⚠️ فشل في تسجيل الطلب. حاول مرة أخرى.' }, true);
    }

  } else {
    const reply = '👋 مرحبًا بك في Watact! أرسل "منتجات" أو "طلب" للبدء.';
    msg.reply(reply);
    await saveMessage({ ...msg, body: reply }, true);
  }
});

client.initialize();
