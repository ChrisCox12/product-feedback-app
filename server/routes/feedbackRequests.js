import express from 'express';
import { 
    getAllFeedback, 
    getFeedback, 
    createFeedback, 
    updateFeedback 
} from '../controllers/feedbackRequests.js';

const router = express.Router();

router.get('/', getAllFeedback);
router.get('/:id', getFeedback);

router.post('/', createFeedback);

router.patch('/:id', updateFeedback);



export default router;