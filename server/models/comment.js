import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    content: String,
    creator: {
        image: String,
        name: String,
        username: String,
        creatorID: mongoose.SchemaTypes.ObjectId
    },
    replies: [mongoose.SchemaTypes.ObjectId],
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;