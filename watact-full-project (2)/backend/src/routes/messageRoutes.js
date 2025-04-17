import express from 'express';
import { getMessages, sendMessage } from '../controllers/messageController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', auth, getMessages);
router.post('/:id', auth, sendMessage);

export default router;
