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

dotenv.config();

const app = express()
const port = 3000 || process.env.PORT

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


app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})