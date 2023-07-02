import PackageModel from "../models/PackageModel.js";
import GuideModel from "../models/GuideModel.js";

export async function getUserHome(req,res){
    const packages = await PackageModel.find().limit(3).lean()
   res.json({err:false,packages})
}

export async function getUserGuides(req,res){
    const guides = await GuideModel.find({active:true}).lean()
   res.json({err:false,guides})
}