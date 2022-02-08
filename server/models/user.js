import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    image: String
});

const User = mongoose.model('User', userSchema);

export default User;