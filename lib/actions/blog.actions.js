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
        const blogs = await Blog.find({},{content:0}).populate('author', 'name image');
        return blogs;
    } catch (error) {
        throw new Error(`Failed to fetch blogs: ${error.message}`);
    }
}

export const fetchSingleBlog = async (blog_title) =>{
    try{
        await connectToDB();
        const blog = await Blog.find({title:blog_title}).populate('author','name image username')
        return blog;
    } catch (error){
        throw new Error(`Failed to fetch blog: ${error.message}`)
    }
}

export const fetchTrendingBlogs = async () => {
    try {
        await connectToDB()
        const blogs = await Blog.find({},{blog_image:1,title:1,description:1}).limit(3).sort('likes')
        return blogs
    } catch (error) {
        throw new Error(`Failed to fetch blog: ${error.message}`)
    }
}