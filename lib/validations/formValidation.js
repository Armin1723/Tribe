"use client"
import * as z from "zod";

export const formSchema = z.object({
    profile_photo: z.string().url(),
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    name: z.string()
            .min(3, {message: "Name must be at least 3 characters."})
            .max(50, {message: "Name must be less than 50 characters."}),
    bio: z.string().min(10, {message: "Bio must be at least 10 characters."}),
    alias: z.string()
    })