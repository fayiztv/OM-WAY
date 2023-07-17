import packageModel from "../models/PackageModel.js";
import GuideModel from "../models/GuideModel.js";
import BookingModel from "../models/BookingModel.js";
import cloudinary from "../config/cloudinary.js";

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
      guideId,
    } = req.body;
    const image = await cloudinary.uploader.upload(req.body.packageImage, {
      folder: "onmyWay",
    });

    const packages = await packageModel.create({ ...req.body, image });
    res.json({ err: false });
  } catch (err) {
    console.log(err);
    res.json({ err: true, error: err, message: "Please add a image" });
  }
}

export async function getGuidePackages(req, res) {
  const id = req.params.id;
  const packages = await packageModel.find({ guideId: id }).lean();
  res.json({ err: false, packages });
}

export async function deletePackage(req, res) {
  try {
    const id = req.body.id;
    await packageModel.deleteOne({ _id: id });
    res.json({ err: false });
  } catch (err) {
    return res.json({ err: true, message: "Something went wrong", error: err });
  }
}

export async function getPackageEdit(req, res) {
  const id = req.params.id;

  const packages = await packageModel.findById(id).lean();
  res.json(packages);
}

export async function postEditPackage(req, res) {
  try {
    const id = req.body.id;
    const { destination, price, activites, days, nights, places, descrption } =
      req.body;

    const image = await cloudinary.uploader.upload(req.body.packageImage, {
      folder: "onmyWay",
    });

    await packageModel.findByIdAndUpdate(id, {
      $set: {
        destination,
        price,
        activites,
        days,
        nights,
        places,
        descrption,
        image,
      },
    });

    return res.json({ err: false });
  } catch (err) {
    return res.json({ err: true, message: "Please add a image", error: err });
  }
}

export async function getGuideProfileEdit(req, res) {
  const id = req.params.id;

  const guide = await GuideModel.findById(id).lean();
  res.json(guide);
}

export async function postGuideEditProfile(req, res) {
  try {
    const id = req.body.id;
    const { firstName, lastName, email, contact, about } = req.body;
    const guide = await GuideModel.findByIdAndUpdate(id, {
      $set: {
        firstName,
        lastName,
        email,
        contact,
        about,
      },
    });
    return res.json({ error: false });
  } catch (error) {
    console.log(error);
  }
}

export async function guideEditAvatar(req , res) {
  try {
    const guideImage = await cloudinary.uploader.upload(req.body.image, {
      folder: "onmyWay",
    });

    const updatedGuide = await GuideModel.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { image: guideImage.url } },
    );
    res.json({err: false})

  } catch (error) {
    console.log(error);
    res.json({err: true})
  }

}

export async function getGuideBookings(req,res){
  try{
    const id=req.params.id
    const bookings = await BookingModel.find({guideId:id}).populate('userId').populate('packageId').lean()
    res.json({err:false,bookings})
  }catch(err){
    console.log(err);
    res.json({ err: true, message: "something went wrong", err });
  }
}

export async function setUpcoming(req, res) {
  try{
      const id = req.body.id
      await BookingModel.findByIdAndUpdate(id, { $set: { status: 'upcoming' } }).lean()
      return  res.json({err: false })
  } catch (err) {
      return res.json({ err: true, message: "Something went wrong", error: err })
  }
}

export async function setCompleted(req, res) {
  try{
      const id = req.body.id
      await BookingModel.findByIdAndUpdate(id, { $set: { status: 'completed' } }).lean()
      return  res.json({err: false })
  } catch (err) {
      return res.json({ err: true, message: "Something went wrong", error: err })
  }
}

