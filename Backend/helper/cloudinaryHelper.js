import cloudinary from '../config/cloudinaryconfig.js';
import { rimraf } from 'rimraf';

const uploadImageOnCloudinary = async (filePath, folderName) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folderName
        });
        console.log('Uploaded to Cloudinary:', result);

        // // Delay before attempting to delete the file
        // setTimeout(() => {
        //     rimraf(filePath, { glob: false })
        //         .then(() => console.log('File deleted from server:', filePath))
        //         .catch((error) => console.error('Failed to delete the file from server using rimraf', error));
        // }, 10000); // 10-second delay

        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error(error.message || 'Cloudinary upload error');
    }
};

export { uploadImageOnCloudinary };
