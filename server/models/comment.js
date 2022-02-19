import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    content: String,
    creator: {
        image: String,
        name: String,
        username: String,
        creatorID: mongoose.SchemaTypes.ObjectId
    },
    isReply: {
        type: Boolean, 
        default: false
    },
    replyTo: mongoose.SchemaTypes.ObjectId,
    replies: [mongoose.SchemaTypes.ObjectId]
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;