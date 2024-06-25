import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
      
    content:{
        type:String,
        required:true
    },
    status:{
       type:Boolean,
       default:false
    },
    editable:{
        type:Boolean,
        default:false
    },
},{timestamps:true})

export const Todo=mongoose.model("Todo",todoSchema)