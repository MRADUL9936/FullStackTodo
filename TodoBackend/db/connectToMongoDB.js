import {connect} from 'mongoose';

const connectToMongoDB=async()=>{
    try{
       await connect(process.env.MONGODB_URI)
       console.log("Connected to MongoDB");


    }catch(err){
      console.log("Error connecting to MongoDB",err.message )
    
    }
}

export default connectToMongoDB;