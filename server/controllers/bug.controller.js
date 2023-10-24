import { ROLES } from "../constants.js";
import Bug from "../models/bug.model.js";
import User from "../models/User.model.js"

export const getAllBugs = async (req,res) => {
    const {userId} = req.params;
    const {role, id} =req.user;
    //assignedTo - developer
    //reportedBy - Qa
    try{
        let bugs = [];
        if (role === ROLES.QA){
            bugs= await Bug.find({reportedBy: id})
        }else{
            bugs = await Bug.find({assignedTo: id})
        }
        return res.status(200).send(bugs);
    }catch(e){
        res.status(500).send('Could not fetch Bugs');
    }
};
export const createBug= async (req,res) =>{
    const bug = req.body;
    const bugToSave= new Bug(bug);
    try{
       const result = await bugToSave.save();
       res.status(200).send(result);
    }catch(e){
        res.status(500).send('Error');
    }
}
export const changeCompletedStatus = async (req,res) =>{
    const {completed} = req.body;
    const {id}= req.params;
    try{
        await Bug.findByIdAndUpdate({_id: id},{completed: completed});
    res.status(200).send('Successfully changed status');
    }catch(e){
        res.status(500).send('Failed status');
    }
};