"use server";

import { revalidatePath } from 'next/cache'
import { connectToDB } from '../mongoose'
import User from '../models/user.model';


export const checkAlias = async (alias) =>{
    try {
        await connectToDB();
        const tempUser = await User.findOne({ alias: alias.toLowerCase() });
        if (tempUser) {
        return true;
        }
        return false
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async ({
        userId,
        username,
        name,
        bio,
        image,
        alias,
        path,

    }) => {
    try {
        connectToDB();
        await User.findOneAndUpdate(
          { id: userId },
          {
            username: username.toLowerCase(),
            name,
            bio,
            image,
            alias,
            onboarded: true,
          },
          { upsert: true }
        );
    
        if (path === "/profile/edit") {
          revalidatePath(path);
        }
      } catch (error) {
        throw new Error(`Failed to create/update user: ${error.message}`);
      }

}

export const fetchUser = async(userId) =>{
    try {
        await connectToDB();
        const user = await User.findOne({ id: userId });
        if (user) {
        return user;
        }
        return null;
    } catch (error) {
        console.log(error.message);
    }
}