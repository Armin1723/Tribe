"use server"
import Space from "../models/space.model"
import User from "../models/user.model"
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