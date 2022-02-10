import Feedback from '../models/feedbackRequest.js';

export async function getFeedback(req, res) {
    try {
        const feedback = await Feedback.find();

        res.status(200).json(feedback);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

export async function createFeedback(req, res) {
    const feedback = req.body;
    const newFeedback = new Feedback(feedback);

    try {
        //await newFeedback.save();

        res.status(200).json(newFeedback);
    } 
    catch(error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}