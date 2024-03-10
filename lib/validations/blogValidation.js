"use client"
import * as z from "zod";
import { hasSpecialCharacters } from "../utils";

export const formSchema = z.object({
    blog_image: z.string().url(),
    title: z.string().min(10, {
      message: "Title must be at least 10 characters.",
    }).max(100, {message: "Title must be less than 100 characters."})
      .refine((input)=> !hasSpecialCharacters(input), {message:"Title cannot contain hyphens."}),
    description: z.string()
            .min(20, {message: "Description must be at least 20 characters."})
            .max(300, {message: "Description must be less than 300 characters."}),
    content: z.string().min(100, {message: "Content must be at least 100 characters."}),
    })