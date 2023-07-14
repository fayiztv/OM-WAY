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
    type:{
        type:String,
        default:""
    },
    complaintId:{
        type:String,
        default:"ComplaintId"+Date.now()
    },
    description:{
        type:String,
        required:true
    },
    
},{timestamps:true })

const ComplaintModel=mongoose.model("Complaint", schema)
export default ComplaintModel