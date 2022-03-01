import mongoose from 'mongoose';

const replySchema = mongoose.Schema({
    content: String,
    creator: {
        image: String,
        name: String,
        username: String,
        creatorID: mongoose.SchemaTypes.ObjectId
    },
    replyingTo: String,
    rootCommentId: mongoose.SchemaTypes.ObjectId,
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Reply = mongoose.model('Reply', replySchema);

export default Reply;

