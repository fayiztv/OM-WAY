import packageModel from "../models/PackageModel.js";
import  cloudinary from '../config/cloudinary.js'

export async function addPackage(req, res) {
  try {
    const {
      destinastion,
      price,
      activites,
      days,
      nights,
      places,
      descrption,
    } = req.body;
    const image = await cloudinary.uploader.upload(req.body.packageImage, {
      folder: "onmyWay",
    });

    const packages = await packageModel.create({ ...req.body, image });
    console.log("saved");
    res.json({ err: false });
  } catch (err) {
    console.log(err);
    res.json({ err: true, error: err, message: "Something Went Wrong" });
  }
}

export async function getGuidePackages(req,res){
  const packages = await packageModel.find().lean()
  res.json({err:false,packages})
}
