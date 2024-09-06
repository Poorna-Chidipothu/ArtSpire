import cloudinary from '../config/cloudinaryconfig.js';

const uploadImageOnCloudinary = async (filePath, folderName) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folderName
        });
        // console.log('Uploaded to Cloudinary:', result);

        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error(error.message || 'Cloudinary upload error');
    }
};

export { uploadImageOnCloudinary };
