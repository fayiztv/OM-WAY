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
      type: String,
      default:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
    },
  },
  {
    timestamps: true,
  }
);

const GuideModel = mongoose.model("Guide", GuideSchema);
export default GuideModel;
