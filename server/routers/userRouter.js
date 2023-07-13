import express from "express";
import {
  getUserGuideDetails,
  getUserGuides,
  getUserHome,
  getUserPackageDetails,
  getUserPackages,
  getUserProfileEdit,
  userEditProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/home", getUserHome);
router.get("/edit-profile/:id", getUserProfileEdit);
router.post("/edit-profile/", userEditProfile);
router.get("/guides", getUserGuides);
router.get("/packages", getUserPackages);
router.get("/package-details/:id", getUserPackageDetails);
router.get("/guide-details/:id", getUserGuideDetails);

export default router;
