import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import Image from'../models/imageModel.js';

const likeRoute = express.Router();

likeRoute.post('/', authMiddleware, async (req, res) => {
  const { imageId } = req.body;
  const userId = req.userId;
  
  try {
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    // Check if the user has already liked the image.
    const isLiked = image.likes.includes(userId);

    // Toggle like/unlike
    if (isLiked) {
      image.likes.pull(userId); // Unlike (remove userId from likes array)
    } else {
      image.likes.push(userId); // Like (add userId to likes array)
    }

    await image.save();

    res.status(200).json({
      success: true,
      isLiked: !isLiked,
      likesCount: image.likes.length,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export default likeRoute;
