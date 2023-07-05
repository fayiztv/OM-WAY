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

export async function getUserPackages(req,res){
    const packages = await PackageModel.find().lean()
   res.json({err:false,packages})
}

export async function getUserPackageDetails(req,res){
    const id = req.params.id
    const packages = await PackageModel.findById(id).lean()
   res.json({err:false,packages})
}