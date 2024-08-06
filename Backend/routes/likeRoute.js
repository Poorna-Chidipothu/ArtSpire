import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import Image from'../models/imageModel.js';

const likeRoute = express.Router();

likeRoute.post('/:imgId', authMiddleware, async (req, res) => {
  const imageId = req.params.imgId;
  try {
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    image.likes += 1;
    await image.save();

    res.json({ message: 'Image liked successfully', likes: image.likes });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

export default likeRoute;
