import mongoose from "mongoose";
const packageSchema = new mongoose.Schema({
  destionation: {
    type: String,
  },
  price: {
    type: String,
  },
  activites: {
    type: Array,
  },
  days: {
    type:Number,
  },
  nights: {
    type:Number,
  },
  places: {
    type: Array,
    required: true,
  },
  descrption: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
});

const packageModel = mongoose.model("packages",packageSchema);
export default packageModel;
