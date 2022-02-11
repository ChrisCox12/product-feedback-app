import express from 'express';
import { getAllFeedback, getFeedback, createFeedback } from '../controllers/feedbackRequests.js';

const router = express.Router();

router.get('/', getAllFeedback);
router.get('/:id', getFeedback);
router.post('/', createFeedback);



export default router;