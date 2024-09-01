import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import Image from '../models/imageModel.js';
import UserModel from '../models/userModel.js';
import aiGenImageModel from '../models/aiGenImageModel.js';


const getRoute = express.Router();

getRoute.get('/my-uploads',authMiddleware,async (req,res) => {
    const userId = req.userId;
    try{
        const myimages = await Image.find({uploadedBy:userId});
        
        res.status(200).json({
            success: true,
            images: myimages,
            message: "Images fetched successfully"
            });

    }catch(error){
        console.log(error);
    }    
});
 
getRoute.get('/get-home-images',async (req,res) => {
    try{
        const images = await Image.find({})
                        .sort({ uploadDate: -1 })
                        .limit(10);
        res.status(200).json({
            success: true,
            images: images,
            message: "Images fetched successfully"
            });
    }catch(error){
        console.log(error);
    }
});

getRoute.get('/get-images', authMiddleware, async (req, res) => {
    try {
        const { page = 1, limit = 20, search = '' } = req.query;
        const userId = req.userId;

        // Create a search query object
        const searchQuery = search
            ? { tags: { $regex: new RegExp(search, 'i') } }
            : {};

        
        // Fetch images with pagination
        
        const images = await Image.find(searchQuery)
            .sort({ uploadDate: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        // Fetch user details for each image
        const imagesWithUserNames = await Promise.all(images.map(async (image) => {
            const user = await UserModel.findById(image.uploadedBy);
            return {
                _id: image._id,
                url: image.picture.picture_url,
                uploader: user.name,
                isLiked: image.likedBy.includes(userId),  // Pass this to the frontend
                likes: image.likes, // Include like count for the uploader's page
                blurHash: image.blurHash,
            };
        }));

        res.status(200).json({
            success: true,
            images: imagesWithUserNames,
            message: "Images fetched successfully"
        });
    } catch (error) {
        console.error('Error in get-images:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.toString() });
    }    
});

getRoute.get('/get-aigen-images',authMiddleware,async (req,res) => {
    const userId = req.userId;
    try{
        const aiimages = await aiGenImageModel.find({createdBy: userId});
        
        res.status(200).json({
            success: true,
            uid: userId,
            images: aiimages,
            message: "Images fetched successfully"
            });

    }catch(error){
        console.log(error);
    }
})

export default getRoute;