import express from "express"
import cors from "cors"
import bodyParser from 'body-parser';
import userRouter from "./routes/userRoute.js"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import uploadRoute from "./routes/uploadRoute.js"
import aigenRouter from "./routes/ai-genRoute.js";

import getRoute from "./routes/getRoute.js";
import deleteRoute from "./routes/deleteRoute.js";
import likeRoute from "./routes/likeRoute.js";
import Image from "./models/imageModel.js";
import mongoose from "mongoose";
import { generateBlurHash } from './utils/blurHashUtils.js';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// // Define __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

dotenv.config();

const app = express()
const port = process.env.PORT || 3000;

// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middlewares initilization
app.use(express.json())
app.use(cors())

// DB Connection
connectDB();


// api Endpoints
app.use("/api/user",userRouter)
app.use("/api/upload",uploadRoute)
app.use("/api/ai-gen",aigenRouter)
app.use("/api/get-img",getRoute)
app.use("/api/delete",deleteRoute)
app.use("/api/like", likeRoute)


// const updateExistingDocuments = async () => {
//     try {
//       await mongoose.connect('mongodb+srv://poorna:artspire123@cluster0.crtpk8o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
  
//       await Image.updateMany(
//         { }, // Match all documents
//         { $set: { likes: [] } } // Set likes field to an empty array
//       );
  
//       console.log('All documents updated successfully.');
//     } catch (error) {
//       console.error('Error updating documents:', error);
//     } finally {
//       mongoose.connection.close();
//     }
//   };
  
//   updateExistingDocuments();

// const updateExistingImagesWithBlurHash = async () => {
//     const images = await Image.find({ blurHash: { $exists: false } });

//     for (const image of images) {
//         const imagePath = path.join(__dirname, 'temp', `${image._id}.jpg`);
//         const writer = fs.createWriteStream(imagePath);

//         const response = await axios({
//             url: image.picture.picture_url,
//             method: 'GET',
//             responseType: 'stream'
//         });

//         response.data.pipe(writer);

//         writer.on('finish', async () => {
//             const blurHash = await generateBlurHash(imagePath);
//             await Image.updateOne({ _id: image._id }, { blurHash: blurHash });
//             fs.unlinkSync(imagePath);
//         });

//         writer.on('error', (error) => {
//             console.error(`Error processing image ${image._id}:`, error);
//         });
//     }

//     console.log('All images processed.');
// };

// updateExistingImagesWithBlurHash();


app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})
