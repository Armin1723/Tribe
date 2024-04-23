'use server'

import { revalidatePath } from "next/cache"
import Space from "../models/space.model"
import Thread from "../models/thread.model"
import { connectToDB } from "../mongoose"

export const publishThread = async (threadData, space_name) => {
    try {
        await connectToDB()
        const createdThread = await Thread.create(threadData)
        await Space.findOneAndUpdate({space_name:space_name},{
            $push: { space_threads : createdThread._id }
        })
        revalidatePath(`/spaces/${space_name}`)
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchThreadById = async (id) =>{
    try {
        await connectToDB()
        const thread = await Thread.findOne({_id : id})
                                    .populate('thread_author', 'alias')
                                    .populate({
                                        path : 'thread_comments',
                                        select:'thread_content thread_author thread_likes parentId thread_commens createdAt',
                                        populate : {
                                            path:'thread_author',
                                            select:'alias'
                                        }
                                    })
        return thread
    } catch (error) {
        console.log("error in function fetchThreadById: ", error.message)
    }
}

export const toggleLike = async (threadID, userID, path) => {
    try {
        await connectToDB();
        const thread = await Thread.findOne({_id:threadID},{thread_likes:1})
        if(thread.thread_likes.length > 0 && thread.thread_likes?.includes(userID)){
            await Thread.findByIdAndUpdate(threadID, { $pull: { thread_likes: userID }, })
        }else{
            await Thread.findByIdAndUpdate(threadID, { $push: { thread_likes: userID }, })
        }
        revalidatePath(path)
    } catch (error) {
        console.log("Error in thread toggleLike:", error.message)
    }
}