import { SALT_ROUNDS } from "../constants.js";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import getUserByEmail from "../dao/user.dao.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../constants.js";

export const register = async (req,res) =>{
    const {password, ...data}= req.body;
try{
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({...data, password: hashedPassword});
    await user.save();
    res.status(201).send("User created succesfully");
    }catch (e) {
        res.status(500).send("Could not create user");
    }
  };
export const login = async (req,res) => {
    const {email, password} = req.body;
    try{
    const user = await getUserByEmail(email);
    const match = await bcrypt.compare(password, user.password);
    console.log(user);

    if(match) {
        const token = jwt.sign({
            id:user._id.toString(),
            email: user.email,
            role: user.role
          }, SECRET , { expiresIn: 60 * 60 });
        res.status(200).send({token});
    }else{
        res.status(401).send("Wrong email or password")
    }
    }catch(e){
        res.status(500).send("Something went wrong");
    }
};