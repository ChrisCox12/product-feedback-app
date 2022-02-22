import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    content: String,
    creator: {
        image: String,
        name: String,
        username: String,
        creatorID: mongoose.SchemaTypes.ObjectId
    },
    hasRootId: {
        type: Boolean, 
        default: false
    },
    replyTo: String,
    replies: [mongoose.SchemaTypes.ObjectId],
    rootCommentId: mongoose.SchemaTypes.ObjectId
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;