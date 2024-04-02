'use server'

import Space from "../models/space.model"
import Thread from "../models/thread.model"
import { connectToDB } from "../mongoose"

export const CreateThread = async (threadData, space_name) => {
    try {
        await connectToDB()
        const createdThread = await Thread.create(threadData)
        await Space.findOneAndUpdate({space_name:space_name},{
            $push: { threads : createdThread._id }
        })
    } catch (error) {
        console.log(error.message)
    }
}