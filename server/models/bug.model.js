import mongoose from 'mongoose';
const { Schema } = mongoose;

const bugSchema = new Schema ({
    title: String,
    steps: String,
    assignedTo: String,
    reportedBy: String,
    completed: Boolean,
    timestamp: {
    type:Date,
    default: new Date()
    },
    severity: String

});

const Bug = mongoose.model('bugs', bugSchema);


export default Bug;