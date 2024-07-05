import mongoose from "mongoose";

async function dbConnect (){
    try{
    await mongoose.connect(process.env.DB);
    console.log("DB connected ")
    }catch(err){
        return err ;
    }
}

export default dbConnect;