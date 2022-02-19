import express from "express";
import { 
    getAllComments, 
    getComment, 
    createComment, 
    updateComment 
} from '../controllers/comments.js';

const router = express.Router();

router.get('/', getAllComments);
router.get('/:id', getComment);

router.post('/', createComment);

router.patch('/:id', updateComment);
//router.patch('/:id/comment', addComment);



export default router;