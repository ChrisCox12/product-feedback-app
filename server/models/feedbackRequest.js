import mongoose from 'mongoose';

const feedbackRequestSchema = mongoose.Schema({
    title: String,
    category: String,
    upvote: Number,
    status: String,
    description: String,
    comments: [{
        content: String,
        user: { 
            name: String,
            username: String
        }
    }]
});

const Feedback = mongoose.model('Feedback', feedbackRequestSchema);

export default Feedback;