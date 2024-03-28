import Space from "../models/space.model"
import { connectToDB } from "../mongoose"

export const fetchAllSpaces = async (pageNumber, pageSize) => {
    try {
        connectToDB()
        const spaces = Space.find().skip((pageNumber - 1) * pageSize).limit(pageSize)
        const totalSpaces = Space.find()
        const hasMore = totalSpaces.length > pageNumber * pageSize
        return { spaces, hasMore } 
    } catch (error) {
        console.log(error.message)
    }
}