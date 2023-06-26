import packageModel from "../models/PackageModel.js";
import  cloudinary from '../config/cloudinary.js'

export async function addPackage(req, res) {
  try {
    const {
      destination,
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

export async function deletePackage(req, res) {
  try{
      const id = req.body.id
      await packageModel.deleteOne({_id:id})
      res.json({ err: false })
  } catch (err) {
      return res.json({ err: true, message: "Something went wrong", error: err })
  }
}

export async function getPackageEdit(req,res){
  const id=req.params.id

  const packages =await packageModel.findById(id).lean()
  res.json(packages)
}

export async function postEditPackage(req,res){
  try{
    const id=req.body.id
    const { destination,price,activites,days,nights,places,descrption } = req.body

    const image = await cloudinary.uploader.upload(req.body.packageImage, {
      folder: "onmyWay",
    });

    await packageModel.findByIdAndUpdate(id,{$set:{
      destination,price,activites,days,nights,places,descrption , image
    }})

    return res.json({err:false})
  }catch(err){
    return res.json({ err: true, message: "Something went wrong", error: err })
    console.log(err);
  }
}