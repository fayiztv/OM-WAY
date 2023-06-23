import GuideModel from "../models/GuideModel.js";

export async function getUserHome(req,res){
    const guides = await GuideModel.find({active:true}).limit(3).lean()
   res.json({err:false,guides})
}

export async function getUserGuides(req,res){
    const guides = await GuideModel.find({active:true}).lean()
   res.json({err:false,guides})
}