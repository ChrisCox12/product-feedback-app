import express from 'express';
import { getAllReplies } from '../controllers/replies.js';

const router = express.Router();

router.get('/', getAllReplies);

export default router;