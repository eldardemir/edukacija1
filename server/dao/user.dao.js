import User from "../models/User.model.js"


const getUserByEmail = async (email) => {
    try{
    const user = await User.findOne({email: email});
    return user;
    } catch(e){
        return null;
    }
}
export default getUserByEmail;