"use client"
import * as z from "zod";

export const formSchema = z.object({
    query: z.string().min(3 , {
      message: "Query must be at least 3 characters.",
    })
    })
