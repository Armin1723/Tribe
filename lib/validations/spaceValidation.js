"use client"
import * as z from "zod";
import { hasSpecialCharacters } from "../utils";

export const formSchema = z.object({
    space_name: z.string().min(5 , {
      message: "Space Name must be at least 5 characters.",
    }).refine((input)=> !hasSpecialCharacters(input), {message:"Space Name cannot contain Special Symbols."}),
    space_image: z.string().url(),
    space_description: z.string().min(10, {message: "Description must be at least 10 characters."})
    })



    // .refine((input)=> isUniqueSpace(input), {message:"Space Name already exists. Please choose another name."}),