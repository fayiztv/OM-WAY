import mongoose from "mongoose";
const packageSchema = new mongoose.Schema({
  destionation: {
    type: String,
  },
  price: {
    type: String,
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

const packageModel = mongoose.model("packages",packageSchema);
export default packageModel;
