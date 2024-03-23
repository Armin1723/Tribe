"use server";

import { revalidatePath } from 'next/cache'
import { connectToDB } from '../mongoose'
import User from '../models/user.model';
import Blog from '../models/blog.model';


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

export const fetchUserByUsername = async(username) =>{
  try {
    connectToDB()
    const user = User.findOne({username:username})
    return user;
  } catch (error) {
    console.log(error.message)
  }
}

export const fetchBlogsByUser = async(userID, pageNumber = 1, pageSize = 2) =>{
  try {
    connectToDB()
    const userBlogs = await User.findOne({_id:userID},{blogs:1})
                                .populate({path:'blogs', model: Blog, select:'title blog_image description likes author', populate : ({path:'author', select:'name username image'}), limit : pageSize , skip: pageSize * (pageNumber-1)})
    const totalBlogs = await User.findOne({_id:userID},{blogs:1})
    const hasMore = totalBlogs.blogs.length > pageNumber * pageSize;
    const blogs = userBlogs.blogs
    return {blogs, hasMore};
    
  } catch (error) {
    console.log(error.message)
  }
}

export const getPopularity = async(userID) =>{
  try {
    connectToDB()
    const userBlogs = await User.findOne({_id:userID},{blogs:1}).populate('blogs','likes')
    let totalLikes = 0
    userBlogs.blogs.forEach(blog => {
      totalLikes += blog.likes.length
    });
    return totalLikes
  } catch (error) {
    console.log(error.message)
  }
}