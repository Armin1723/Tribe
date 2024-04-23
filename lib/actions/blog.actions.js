"use server";

import { connectToDB } from '../mongoose'
import Blog from '../models/blog.model';
import User from '../models/user.model';
import { currentUser } from '@clerk/nextjs';
import { fetchUser } from './user.actions';
import { revalidatePath } from 'next/cache';


export const createBlog = async (blogData) => {
    try {
        await connectToDB();
        const userData = await currentUser()
        const userInfo = await fetchUser(userData.id)
        const author = userInfo._id
        const blog = await Blog.create({...blogData, author});

        await User.findByIdAndUpdate(author, {
            $push: { blogs : blog._id },
        });
        revalidatePath('/')

    } catch (error) {
        throw new Error(`Failed to create blog: ${error.message}`);
    }
}

export const fetchBlogs = async (pageNumber = 1, pageSize = 2) => {
    try {
        await connectToDB();
        const blogs = await Blog.find({},{content:0}).populate('author', 'name image username').sort({date: 'desc'}).skip(pageSize * (pageNumber - 1)).limit(pageSize);

        const totalBlogs = await Blog.countDocuments();
        const hasMore = totalBlogs > pageSize * pageNumber;
        return {blogs, hasMore};
    } catch (error) {
        throw new Error(`Failed to fetch blogs: ${error.message}`);
    }
}

export const fetchSingleBlog = async (blogID) =>{
    try{
        await connectToDB();
        const blog = await Blog.findOne({_id:blogID}).populate('author','name image username')
        return blog;
    } catch (error){
        throw new Error(`Failed to fetch blog: ${error.message}`)
    }
}

export const fetchTrendingBlogs = async () => {
    try {
        await connectToDB()
        const blogs = await Blog.find({},{blog_image:1,title:1,description:1}).limit(4).sort('likes')
        return blogs
    } catch (error) {
        throw new Error(`Failed to fetch blog: ${error.message}`)
    }
}

export const toggleLike = async (blogID, userID, path) => {
    try {
        connectToDB();
        const blog = await Blog.findOne({_id:blogID},{likes:1})
        if(blog.likes.length > 0 && blog.likes?.includes(userID)){
            await Blog.findByIdAndUpdate(blogID, { $pull: { likes: userID }, })
        }else{
            await Blog.findByIdAndUpdate(blogID, { $push: { likes: userID }, })
        }
        revalidatePath(path)
    } catch (error) {
        console.log("Error in blog toggleLike:", error.message)
    }
}

export const searchBlogs = async (query, path='/search/') =>{
    try {
        await connectToDB()
        const results = await Blog.find({title : { $regex : query.toString()}}, {title : 1, description : 1, _id : 1})
        revalidatePath(path)
        return results

    } catch (error) {
        console.log("Error in search Blogs:", error.message)
    }
}