import mongoose from "mongoose";

async function connectDb(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');
        console.log("the database has been connected successfully");
    }catch(err){
        console.error(`the error is${err}`)
        process.exit(1);
    }
}

export default connectDb;