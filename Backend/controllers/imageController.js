import { uploadImageOnCloudinary } from '../helper/cloudinaryHelper.js';
import { generateImageHash } from '../utils/hashImage.js';
import { generateBlurHash } from '../utils/blurHashUtils.js';
import Image from '../models/imageModel.js';
import fs from 'fs';

const addImageController = async (req, res) => {
    try {
        // console.log('addImageController called');
        const tags = req.body['tags'];
        const userId = req.userId;
        const pictures = req.files; // Multer array upload

        if (!pictures || pictures.length === 0) {
            return res.status(400).json({ message: "No files uploaded." });
        }

        const uploadedImages = [];
        // console.log(tags);

        for (let i = 0; i < pictures.length; i++) {
            const picture = pictures[i];
            const imageTags = Array.isArray(tags) ? tags[i] : tags;
            const imageHash = await generateImageHash(picture.path);

            // Check for duplicate hash
            const existingImage = await Image.findOne({ hash: imageHash });
            if (existingImage) {
                console.log(`Duplicate image detected: ${picture.originalname}`);
                continue; // Skip duplicate image
            }


            try {
                const result = await uploadImageOnCloudinary(picture.path, 'Images');
                const blurHash = await generateBlurHash(picture.path);

                const newImage = new Image({
                    picture: {
                        picture_url: result.secure_url,
                        public_id: result.public_id,
                    },
                    uploadedBy: userId,
                    tags: imageTags ? imageTags.split(',') : [],
                    hash: imageHash,
                    blurHash: blurHash,
                });

                await newImage.save();
                uploadedImages.push(newImage);
            } catch (uploadError) {
                console.error(`Error uploading image ${picture.originalname}:`, uploadError);
                continue; // Skip this image and proceed with the next
            }

            
            // Retry mechanism for file deletion
            try {
                await fs.promises.unlink(picture.path);
            } catch (error) {
                console.error(`Failed to delete the file from server`, error);
            }
        }
        // res.status(201).json({ success: true, images: uploadedImages });
        if (uploadedImages.length > 0) {
            return res.status(201).json({ success: true, images: uploadedImages });
        } else {
            return res.status(400).json({ success: false, message: 'No valid images were uploaded.' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Image upload error' });
    }
};

export { addImageController };
