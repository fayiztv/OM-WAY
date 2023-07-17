import mongoose from "mongoose"

const schema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    guideId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Guide'
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true,
    }
},{timestamps:true })

const RatingModel=mongoose.model("Ratings", schema)
export default RatingModel