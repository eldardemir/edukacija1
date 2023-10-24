import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema ({
    name: String,
    email: String,
    password: String,
    role: String
});

const User = mongoose.model('users', userSchema);


export default User;
