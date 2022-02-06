import express from 'express';
import { getFeedback, createFeedback } from '../controllers/feedbackRequests.js';

const router = express.Router();

router.get('/', getFeedback);
router.post('/', createFeedback);



export default router;