import mongoose from "mongoose";
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected successfully");
    }
    catch(error){
        console.log("something went wrong while connecting with the db" , error)
    }
}

export default connectDb ;