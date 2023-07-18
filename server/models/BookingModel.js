import mongoose from "mongoose"

const schema = new mongoose.Schema({
    packageId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Package'
    },
    guideId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Guide'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    payment:{
        type:Object,
        default:{}
    },
    bookedDate:{
        type: Date,
        required:true
    },
    bookEndDate:{
        type: Date,
        required:true
    },
    guestes:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"upcoming"
    },
},{timestamps:true })

const BookingModel=mongoose.model("Booking", schema)
export default BookingModel