import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI;

async function connectDb(){
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("the database has been connected successfully");
    }catch(err){
        console.error(`the error is${err}`)
        process.exit(1);
    }
}

export default connectDb;