import mongoose from "mongoose";

const spaceSchema = new mongoose.Schema({
    space_name : {
        type: String,
        required: true
    },
    space_description : {
        type: String,
        required: true
    },
    space_image : {
        type: String,
        required: true
    },
    space_members : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    space_admin : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    space_requests : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    space_threads : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    ],
})

const Space = mongoose.models.Space || mongoose.model("Space", spaceSchema);
export default Space;