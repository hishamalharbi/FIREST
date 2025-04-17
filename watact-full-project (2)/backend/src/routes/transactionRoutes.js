import express from 'express';
import { getTransactions } from '../controllers/transactionController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getTransactions);

export default router;
