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