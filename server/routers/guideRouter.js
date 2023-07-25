import express from "express";
import {
  addPackage,
  deleteBooking,
  deletePackage,
  getGuide,
  getGuideBookings,
  getGuidePackages,
  getGuideProfileEdit,
  getPackageEdit,
  guideDashboard,
  guideEditAvatar,
  guideReviews,
  postEditPackage,
  postGuideEditProfile,
  setCompleted,
  setUpcoming,
} from "../controllers/guideController.js";
const router = express.Router();

router.post("/add-package", addPackage);
router.get("/packages/:id", getGuidePackages);
router.patch("/packages/delete", deletePackage);
router.get("/edit-package/:id", getPackageEdit);
router.post("/edit-package", postEditPackage);
router.get("/edit-profile/:id", getGuideProfileEdit);
router.post("/edit-profile", postGuideEditProfile);
router.patch("/update-avatar", guideEditAvatar);
router.get("/bookings/:id", getGuideBookings);
router.patch("/booking/completed", setCompleted);
router.patch("/booking/upcoming", setUpcoming);
router.get("/reviews/:id", guideReviews);
router.patch("/booking/delete", deleteBooking);
router.get("/dashboard/:id",guideDashboard)
router.get("/get-guide/:id",getGuide)

export default router;
