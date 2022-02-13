import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema({
    creatorID: mongoose.SchemaTypes.ObjectId,
    title: String,
    category: String,
    upvotes: {
        type: Number, 
        default: 0
    },
    status: {
        type: String,
        default: 'suggestion'
    },
    description: String,
    comments: [{
        content: String,
        creator: { 
            image: String,
            name: String,
            username: String,
            creatorID: mongoose.SchemaTypes.ObjectId
        }
    }]
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;