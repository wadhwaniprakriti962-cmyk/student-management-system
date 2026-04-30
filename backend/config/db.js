const mongoose=require("mongoose");
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb is connected successfully")
    }
    catch(error){
        console.log("COnnection is failed",error)
        process.exit(1)
    }
}
module.exports=connectDb;