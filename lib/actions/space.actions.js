"use server"
import Space from "../models/space.model"
import User from "../models/user.model"
import Thread from "../models/thread.model"
import { connectToDB } from "../mongoose"
import { currentUser } from '@clerk/nextjs';
import { fetchUser } from './user.actions';
import { revalidatePath } from 'next/cache';

export const fetchAllSpaces = async (pageNumber, pageSize) => {
    try {
        await connectToDB()
        const spaces = await Space.find({}).skip((pageNumber - 1) * pageSize).limit(pageSize).populate('space_admin', 'alias')
        const totalSpaces = await Space.find({})
        const hasMore = totalSpaces.length > pageNumber * pageSize
        return { spaces, hasMore } 
    } catch (error) {
        console.log(error.message)
    }
}

export const createSpace = async (spaceData) =>{
    try {
        await connectToDB()
        const userData = await currentUser()
        const userInfo = await fetchUser(userData.id)
        const space_admin = userInfo._id
        const createdSpace = await Space.create({...spaceData,space_admin})
        await Space.findByIdAndUpdate(createdSpace._id,{
            $push: { space_members: space_admin }
        })

        //Updating user model
        await User.findByIdAndUpdate(space_admin, {
            $push: { spaces : createdSpace._id },
        });
        revalidatePath(`/spaces/${createdSpace.space_name}`)

    } catch (error) {
        console.log(error.message)
    }

}

export const isUniqueSpace= async (space_name) => {
    try {
        await connectToDB()
        const space = await Space.findOne({space_name:space_name})
        return !space
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchTrendingSpaces = async () => {
    try {
        await connectToDB()
        const spaces = await Space.find({},{space_name: 1, space_image:1, space_admin:1, space_description:1}).populate('space_admin', 'alias').limit(3)
        return spaces
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchSpace = async (space_name) =>{
    try {
        await connectToDB()
        const space = await Space.findOne({ space_name },{space_threads: 0})
                                .populate("space_admin", 'alias id ')
                                .populate("space_members", 'alias username id ')
                                .populate("space_requests", 'alias id ')
        const user = await currentUser()
        const isAdmin = space.space_admin.id === user.id
        const isMember = space.space_members.map(member => member.id).includes(user.id)
        const requestPending = space.space_requests.map(req => req.id).includes(user.id)
        
        return { space, isAdmin, isMember, requestPending }  
    } catch (error) {
        console.log("error in function fetchspace: ", error.message)
    }
}

export const fetchSpaceShort = async (space_name , userID) =>{
    try {
        await connectToDB()
        const space = await Space.findOne({ space_name },{space_members:1, space_admin: 1})
                                .populate('space_members', 'alias username id _id')
                                .populate('space_admin', 'alias id _id')
        const isAdmin = space.space_admin.id.toString() === userID
        const isMember = space.space_members.map(member => member.id.toString()).includes(userID)
        return { space, isAdmin, isMember }  
    } catch (error) {
        console.log("error in function fetchspaceshort: ", error.message)
    }
}

export const fetchThreadsBySpacename = async (spacename, pageNumber, pageSize=5) =>{
    try {
        await connectToDB()
        const space = await Space.findOne({space_name : spacename})
                                .populate({
                                    path:'space_threads',
                                    select:'thread_content thread_author thread_likes parentId thread_comments createdAt',
                                    skip:(pageNumber-1)*pageSize,                                    
                                    limit: pageSize,
                                    populate:{
                                        path:'thread_author',
                                        select:'alias'
                                    }
                                })

        const totalThreads = await Space.findOne({space_name : spacename},{ space_threads:1 })
        const hasMore = totalThreads.space_threads.length > pageSize * pageNumber
        const threads = space.space_threads
        return {threads , hasMore}
    } catch (error) {
        console.log("error in function fetchThreadsBySpacename: ", error.message)
    }
}

export const sendRequest = async (spaceId, path) => {
    try {
        await connectToDB()
        const userData = await currentUser()
        const user = await fetchUser(userData.id)
        await Space.findByIdAndUpdate(spaceId, {
            $push: { space_requests: user._id }
        })
        revalidatePath(path)
    }
    catch (error) {
        console.log("error in function sendRequest: ", error.message)
    }
}

export const fetchRequests = async(spacename) =>{
    try {
        await connectToDB()
        const requests = await Space.findOne({space_name: spacename},{space_requests:1})
                                    .populate('space_requests','name username alias image')
        return requests.space_requests
    } catch (error) {
        console.log("Error in fetchRequests:", error.message)
    }
}

export const acceptRequest = async(spacename, userId, path) =>{
    try {
        await connectToDB()
        await Space.findOneAndUpdate({space_name:spacename},{
            $push: { space_members : userId },
            $pull : {space_requests : userId }
        })
        const space = await Space.findOne({space_name:spacename})
        
        await User.findByIdAndUpdate({userId},{
            $push : { spaces : space._id }
        })
        revalidatePath(path)
    } catch (error) {
        console.log('error in accept request:',error.message)
    }
}

export const deleteRequest = async(spacename, userId, path) =>{
    try {
        await connectToDB()
        await Space.findOneAndUpdate({space_name:spacename},{
            $pull : {space_requests : userId }
        })
        revalidatePath(path)
    } catch (error) {
        console.log('error in delete request:',error.message)
    }
}

export const kickOutMember = async (space_name, userId, path) =>{
    try {
        await connectToDB()
        await Space.findOneAndUpdate({space_name},{
            $pull : { space_members : userId }
        })
        const space = await Space.findOne({ space_name })
        await User.findOneAndUpdate({userId},{
            $pull : { spaces : space._id }
        })
        revalidatePath(path);
    } catch (error) {
        console.log("Error in kick out:", error.message)
    }
}