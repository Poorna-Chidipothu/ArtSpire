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

            // let retries = 3;
            // while (retries > 0) {
            //     try {
            //         await fs.unlink(picture.path);
            //         console.log(`Successfully deleted ${picture.path}`);
            //         break;
            //     } catch (err) {
            //         if (err.code === 'EPERM') {
            //             retries--;
            //             console.error(`Retry deleting ${picture.path}, attempts left: ${retries}`);
            //             await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
            //         } else {
            //             console.error(`Failed to delete the file from server`, err);
            //             break;
            //         }
            //     }
            // }

            // const result = await uploadImageOnCloudinary(picture.path, 'Images');
            // // Generate BlurHash
            // const blurHash = await generateBlurHash(picture.path);

            // const newImage = new Image({
            //     picture: {
            //         picture_url: result.secure_url,
            //         public_id: result.public_id,
            //     },
            //     uploadedBy: userId,
            //     tags: imageTags ? imageTags.split(',') : [],
            //     hash: imageHash,
            //     blurHash: blurHash,
            // });

            // await newImage.save();
            // uploadedImages.push(newImage);

            // // Ensure file is closed before attempting to delete it
            // fs.closeSync(fs.openSync(picture.path, 'r'));

            // Retry mechanism for file deletion
            let retries = 3;
            while (retries > 0) {
                try {
                    await fs.promises.unlink(picture.path);
                    console.log(`Successfully deleted ${picture.path}`);
                    break;
                } catch (err) {
                    if (err.code === 'EPERM' && retries > 0) {
                        retries--;
                        console.error(`Retry deleting ${picture.path}, attempts left: ${retries}`);
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
                    } else {
                        console.error(`Failed to delete the file from server`, err);
                        break;
                    }
                }
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
