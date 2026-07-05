import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
dotenv.config({});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.API_SECRET,
    api_key: process.env.API_KEY
})

//upload
export const uploadMedia = async (file) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, { resource_type: "auto" })
        return uploadResponse
    } catch (error) {
        console.log(error)
        return null
    }
}

export const uploadVideoMedia = async (file) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload_large(file, {
            resource_type: "video",
            chunk_size: 6000000,
            timeout: 120000
        })
        return uploadResponse
    } catch (error) {
        console.log(error)
        return null
    }
}

//delete
export const deleteMediaFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log(error)
    }
}

export const deleteVideoFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: "video" })
    } catch (error) {
        console.log(error)
    }
}