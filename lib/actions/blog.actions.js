"use server";

import { connectToDB } from '../mongoose'
import Blog from '../models/blog.model';
import { currentUser } from '@clerk/nextjs';
import { fetchUser } from './user.actions';

export const createBlog = async (blogData) => {
    try {
        await connectToDB();
        const userData = await currentUser()
        const userInfo = await fetchUser(userData.id)
        const author = userInfo._id
        const blog = await Blog.create({...blogData, author});
    } catch (error) {
        throw new Error(`Failed to create blog: ${error.message}`);
    }
}

export const fetchBlogs = async () => {
    try {
        await connectToDB();
        const blogs = await Blog.find().limit(5).populate('author', 'name image');
        return blogs;
    } catch (error) {
        throw new Error(`Failed to fetch blogs: ${error.message}`);
    }
}