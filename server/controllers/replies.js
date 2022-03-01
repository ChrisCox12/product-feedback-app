import Reply from '../models/reply.js';
import mongoose from 'mongoose';

export async function getAllReplies(req, res) {
    try {
        const replies = await Reply.find();

        res.status(200).json(replies);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}