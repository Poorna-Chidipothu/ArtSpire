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
import UserModel from "./models/userModel.js";

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
app.use("/api/auth",userRouter)
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
//     await UserModel.updateMany(
//         { otp: { $exists: true } }, // Only update documents where `otp` field does not exist
//         {
//             $unset: {
//                 otp: '', // Default value for the new field
//                 otpExpires: '' // Default value for the new field
//             }
//         }
//     );

//     console.log("Schema updated and new fields added to existing documents.");
// };

// updateExistingImagesWithBlurHash();


app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})
