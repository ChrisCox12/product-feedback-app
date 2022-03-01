import Post from '../models/post.js';


/*////////////////////////////
/////       GET         /////
//////////////////////////*/

export async function getAllPosts(req, res) {
    try {
        const post = await Post.find();

        res.status(200).json(post);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

export async function getPost(req, res) {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

/*////////////////////////////
/////       POST        /////
//////////////////////////*/

export async function createPost(req, res) {
    const post = req.body;
    const newPost = new Post(post);

    try {
        await newPost.save();

        //res.status(200).json(newFeedback);
        res.status(200).json(newPost._id);
    } 
    catch(error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

/*////////////////////////////
/////       PATCH       /////
///////////////////////////*/

export async function updatePost(req, res) {
    const update = req.body;
    const { id } = req.params;

    try {
        await Post.findByIdAndUpdate(id, update);

        res.status(200).json(update);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function addComment(req, res) {
    const { id, commId } = req.params;

    try {
        await Post.findByIdAndUpdate(
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
        await Post.findByIdAndUpdate(
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