import mongoose from "mongoose";

const GuideSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    block: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },

    image: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const GuideModel = mongoose.model("Guide", GuideSchema);
export default GuideModel;
