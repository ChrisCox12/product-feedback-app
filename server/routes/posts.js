import express from 'express';
import { 
    getAllPosts, 
    getPost, 
    createPost, 
    updatePost ,
    addComment,
    incrementNumComments
} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPost);

router.post('/', createPost);

router.patch('/:id', updatePost);
router.patch('/:id/comment/:commId', addComment);
router.patch('/:id/incrementComments', incrementNumComments);



export default router;