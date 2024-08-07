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
        const images = await Image.find().limit(10);
        res.status(200).json({
            success: true,
            images: images,
            message: "Images fetched successfully"
            });
    }catch(error){
        console.log(error);
    }
})

getRoute.get('/get-images',authMiddleware,async (req,res) => {
    try{
        // Fetch all images
        const images = await Image.find({});
        
        // Fetch user details for each image
        const imagesWithUserNames = await Promise.all(images.map(async (image) => {
            const user = await UserModel.findById(image.uploadedBy);
            return {
                _id: image._id,
                url: image.picture.picture_url,
                uploader: user.name
            };
        }));
        
        res.status(200).json({
        success: true,
        images: imagesWithUserNames,
        message: "Images fetched successfully"
        });
    }
    catch(error){
        console.log(error);
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