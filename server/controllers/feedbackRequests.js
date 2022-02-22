import Feedback from '../models/feedbackRequest.js';


/*////////////////////////////
/////       GET         /////
//////////////////////////*/

export async function getAllFeedback(req, res) {
    try {
        const feedback = await Feedback.find();

        res.status(200).json(feedback);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

export async function getFeedback(req, res) {
    const { id } = req.params;

    try {
        const feedback = await Feedback.findById(id);

        res.status(200).json(feedback);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

/*////////////////////////////
/////       POST        /////
//////////////////////////*/

export async function createFeedback(req, res) {
    const feedback = req.body;
    const newFeedback = new Feedback(feedback);

    try {
        await newFeedback.save();

        //res.status(200).json(newFeedback);
        res.status(200).json(newFeedback._id);
    } 
    catch(error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

/*////////////////////////////
/////       PATCH       /////
///////////////////////////*/

export async function updateFeedback(req, res) {
    const update = req.body;
    const { id } = req.params;

    try {
        await Feedback.findByIdAndUpdate(id, update);

        res.status(200).json(update);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function addComment(req, res) {
    const { id, commId } = req.params;

    try {
        await Feedback.findByIdAndUpdate(
            id,
            {
                $addToSet: {
                    comments: commId
                }
            }
        );

        res.status(200).json(commId);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

export async function incrementNumComments(req, res) {
    const { id } = req.params;

    try {
        await Feedback.findByIdAndUpdate(
            id, 
            {
                $inc: {
                    numComments: 1
                }
            }
        );

        res.status(200).json(id);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}