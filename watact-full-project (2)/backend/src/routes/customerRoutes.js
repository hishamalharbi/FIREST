import express from 'express';
import { getCustomers, createCustomer } from '../controllers/customerController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getCustomers);
router.post('/', auth, createCustomer);

export default router;
