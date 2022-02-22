import express from 'express';
import { 
    getAllFeedback, 
    getFeedback, 
    createFeedback, 
    updateFeedback ,
    addComment,
    incrementNumComments
} from '../controllers/feedbackRequests.js';

const router = express.Router();

router.get('/', getAllFeedback);
router.get('/:id', getFeedback);

router.post('/', createFeedback);

router.patch('/:id', updateFeedback);
router.patch('/:id/comment/:commId', addComment);
router.patch('/:id/incrementComments', incrementNumComments);



export default router;