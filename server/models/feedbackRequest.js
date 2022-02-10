import mongoose from 'mongoose';

const feedbackRequestSchema = mongoose.Schema({
    id: Number,
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
        id: Number,
        content: String,
        user: { 
            image: String,
            name: String,
            username: String
        }
    }]
});

const Feedback = mongoose.model('Feedback', feedbackRequestSchema);

export default Feedback;