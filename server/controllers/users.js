import User from '../models/user.js';

/*////////////////////////////
/////       GET         /////
//////////////////////////*/
export async function getUsers(req, res) {
    try {
        const users = await User.find();

        res.status(200).json(users);
    }
    catch(error) {
        console.log(error);
        
        res.status(404).json({ message: error.message });
    }
}

export async function getUser(req, res) {
    const { id } = req.params;
    
    try {
        const user = await User.findById(id);

        res.status(200).json(user);
    } 
    catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

/*////////////////////////////
/////       POST        /////
//////////////////////////*/

export async function createUser(req, res) {
    const user = req.body;
    const newUser = new User(user);

    try {
        //await newUser.save();

        res.status(200).json(newUser);
    }
    catch(error) {
        console.log(error);
        
        res.status(404).json({ message: error.message });   
    }
}

/*////////////////////////////
/////       PATCH       /////
///////////////////////////*/

export async function updateUser(req, res) {
    const userID = req.params.id;

    try {

    } 
    catch (error) {
        console.log(error)    
    }
}