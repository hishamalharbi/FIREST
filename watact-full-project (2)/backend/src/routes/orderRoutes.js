import express from 'express';
import { getOrders, createOrder, updateOrderStatus } from '../controllers/orderController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getOrders);
router.post('/', auth, createOrder);
router.put('/:id/status', auth, updateOrderStatus);

export default router;
