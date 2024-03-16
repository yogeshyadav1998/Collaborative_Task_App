import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
})

export const UserModel = mongoose.model('User', userSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: String) => UserModel.findOne({email});
export const getUserBySalt = (salt: String) => UserModel.findOne({salt});
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => { return user.toObject()});
export const deleteUserByEmail = (email: String) => UserModel.findOneAndDelete({ email: email});
