import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    creatorID: mongoose.SchemaTypes.ObjectId,
    title: String,
    category: String,
    upvotes: {
        type: Number, 
        default: 0
    },
    status: {
        type: String,
        default: 'Suggestion'
    },
    description: String,
    comments: [mongoose.SchemaTypes.ObjectId],
    numComments: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;