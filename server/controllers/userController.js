import PackageModel from "../models/PackageModel.js";
import UserModel from "../models/UserModel.js";
import GuideModel from "../models/GuideModel.js";
import escapeStringRegexp from 'escape-string-regexp'

export async function getUserHome(req,res){
    const packages = await PackageModel.find().limit(3).lean()
   res.json({err:false,packages})
}

export async function getUserGuides(req,res){
    const guides = await GuideModel.find({active:true}).lean()
   res.json({err:false,guides})
}

export async function getUserPackages(req,res){
    const name=req.query.name?? ""
    const escapedName = escapeStringRegexp(name);
    const packages = await PackageModel.find({destionation:new RegExp(escapedName, 'i')}).lean()
   res.json({err:false,packages})
}

export async function getUserPackageDetails(req,res){
    const id = req.params.id
    const packages = await PackageModel.findById(id).lean()
   res.json({err:false,packages})
}

export async function getUserProfileEdit(req,res){
    const id=req.params.id
  
    const user=await UserModel.findById(id).lean()
    res.json(user)
  }
  
  export async function userEditProfile(req,res){
    const id=req.body.id
    const {name,email,contact}=req.body
    await UserModel.findByIdAndUpdate(id,{$set:{
      name,email,contact
    }})
    return res.json({error:false})
  }