import express from "express";
import { 
    getAllComments, 
    getComment, 
    getAllChildrenOfParent,
    createComment, 
    updateComment,
    addReply 
} from '../controllers/comments.js';

const router = express.Router();

router.get('/', getAllComments);
router.get('/:id', getComment);
router.get('/:id/children', getAllChildrenOfParent);

router.post('/', createComment);

router.patch('/:id', updateComment);
router.patch('/:id/:replyId', addReply);
//router.patch('/:id/comment', addComment);



export default router;