import PackageModel from "../models/PackageModel.js";
import UserModel from "../models/UserModel.js";
import GuideModel from "../models/GuideModel.js";
import ComplaintModel from "../models/ComplaintModel.js";
import escapeStringRegexp from "escape-string-regexp";
import BookingModel from "../models/BookingModel.js";

export async function getUserHome(req, res) {
  const name = req.query.name ?? "";
  const escapedName = escapeStringRegexp(name);
  const packages = await PackageModel.find().limit(3).lean();
  res.json({ err: false, packages });
}

export async function getUserGuides(req, res) {
  const name = req.query.name ?? "";
  const escapedName = escapeStringRegexp(name);
  const guides = await GuideModel.find({
    active: true,
    firstName: new RegExp(escapedName, "i"),
  }).lean();
  res.json({ err: false, guides });
}

export async function getUserPackages(req, res) {
  const name = req.query.name ?? "";
  const escapedName = escapeStringRegexp(name);
  const packages = await PackageModel.find({
    destionation: new RegExp(escapedName, "i"),
  }).lean();
  res.json({ err: false, packages });
}

export async function getUserPackageDetails(req, res) {
  const id = req.params.id;
  const packages = await PackageModel.findById(id).lean();
  res.json({ err: false, packages });
}

export async function userPackageGuide(req, res) {
  const id = req.params.id;
  const guide = await GuideModel.findById(id).lean();
  res.json({ err: false, guide });
}

export async function getUserGuideDetails(req, res) {
  const id = req.params.id;
  const guide = await GuideModel.findById(id).lean();
  const packages = await PackageModel.find({ guideId: id }).lean();
  res.json({ err: false, guide, packages });
}

export async function getUserProfileEdit(req, res) {
  const id = req.params.id;

  const user = await UserModel.findById(id).lean();
  res.json(user);
}

export async function userEditProfile(req, res) {
  const id = req.body.id;
  const { name, email, contact } = req.body;
  await UserModel.findByIdAndUpdate(id, {
    $set: {
      name,
      email,
      contact,
    },
  });
  return res.json({ error: false });
}

export async function addComplaint(req, res) {
  try {
    const { complaintAgainst, description } = req.body;

    let complaint = await ComplaintModel.create({
      guideId: complaintAgainst,
      description,
      userId: req.user._id,
    });

    res.json({ err: false,complaint });

  } catch (error) {
    console.log(error);
    res.json({ err: true, message: "something went wrong", error });
  }
}

export async function getUserBookings(req,res){
  try{
    const id=req.params.id
    const bookings = await BookingModel.find({userId:id}).populate('guideId').populate('packageId').lean()
    res.json({err:false,bookings})
  }catch(err){
    console.log(err);
    res.json({ err: true, message: "something went wrong", err });
  }
}

export async function getUserBookingDetails(req,res){
  try{
    const id=req.params.id
    const booking = await BookingModel.find({_id:id}).populate('guideId').populate('userId').populate('packageId').lean()
    res.json({err:false,booking})
  }catch(err){
    console.log(err);
    res.json({ err: true, message: "something went wrong", err });
  }
}


