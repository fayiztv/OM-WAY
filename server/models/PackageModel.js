import mongoose from "mongoose";
const packageSchema = new mongoose.Schema({
  destionation: {
    type: String,
  },
  price: {
    type: Number,
  },
  activites: {
    type: String,
  },
  days: {
    type:Number,
  },
  nights: {
    type:Number,
  },
  places: {
    type: String,
    required: true,
  },
  descrption: {
    type: String,
    required: true,
  },
  guideId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Guide'
},
  image: {
    type: Object,
    required: true,
  },
});

const PackageModel = mongoose.model("Package",packageSchema);
export default PackageModel;
