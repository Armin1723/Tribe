import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    thread_coontent : {
        type: String,
    },
    thread_likes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    thread_comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    ],
    thread_author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    parentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread"
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);
export default Thread;