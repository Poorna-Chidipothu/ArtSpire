import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import Image from'../models/imageModel.js';

const likeRoute = express.Router();

likeRoute.post('/:imgId', authMiddleware, async (req, res) => {
  const imageId = req.params.imgId;
  const userId = req.userId;
  
  try {
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    // Check if the user has already liked the image.
    const alreadyLiked = image.likedBy.includes(userId);

    if (alreadyLiked) {
      image.likedBy.pull(userId);  // Remove user from likedBy array
      image.likes -= 1;
    } else {
      image.likedBy.push(userId);  // Add user to likedBy array
      image.likes += 1;
    }

    await image.save();

    res.status(200).json({
      message: alreadyLiked ? 'Image unliked' : 'Image liked',
      likes: image.likes,
      likedBy: image.likedBy,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export default likeRoute;
