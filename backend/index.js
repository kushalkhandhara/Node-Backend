import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth-routes.js";

const app = express();

// Use Cookie Parser
app.use(cookieParser());

// Middleware
app.use(express.json());


// For Routes 
app.use("/api/auth/",authRouter);


// Data Base Connection
const DataBaseConnection = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected Successfuly!!")
    }catch(error){
        console.log(error);
    }

}
DataBaseConnection();

const PORT = process.env.PORT;

// Running the Server
app.listen(PORT,()=>{
    console.log(`Server Running On PORT http://localhost:${PORT}`);
});