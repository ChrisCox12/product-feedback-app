import Comment from '../models/comment.js';
import mongoose from 'mongoose';

export async function getAllComments(req, res) {
    try {
        const comment = await Comment.find();

        res.status(200).json(comment);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

export async function getAllChildrenOfParent(req, res) {
    const { id } = req.params;

    try {
        const objId = new mongoose.Types.ObjectId(id);

        const children = await Comment.find({ rootCommentId: objId });

        res.status(200).json(children);
    } catch (error) {
      console.log(error);
      
      res.status(404).json({ message: error.message });
    }
}

export async function getComment(req, res) {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);

        res.status(200).json(comment);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

export async function createComment(req, res) {
    const comment = req.body;
    const newComment = new Comment(comment);

    try {
        await newComment.save();

        //res.status(200).json(newComment);
        res.status(200).json(newComment);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

export async function updateComment(req, res) {
    const update = req.body;
    const { id } = req.params;

    try {
        await Comment.findByIdAndUpdate(id, update);

        res.status(200).json(update);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

export async function addReply(req, res) {
    const { id, replyId } = req.params;

    try {
        await Comment.findByIdAndUpdate(
            id,
            {
                $addToSet: {
                    replies: replyId
                }
            }
        );

        res.status(200);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}