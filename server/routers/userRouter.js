import express from "express";
import {
  addComplaint,
  getUserBookingDetails,
  getUserBookings,
  getUserGuideDetails,
  getUserGuides,
  getUserHome,
  getUserPackageDetails,
  getUserPackages,
  getUserProfileEdit,
  userEditProfile,
  userPackageGuide,
} from "../controllers/userController.js";
import { paymentOrder, verifyPayment } from "../controllers/PaymentController.js";

const router = express.Router();

router.get("/home", getUserHome);
router.get("/edit-profile/:id", getUserProfileEdit);
router.get("/bookings/:id", getUserBookings);
router.get("/booking-details/:id", getUserBookingDetails);
router.post("/edit-profile/", userEditProfile);
router.get("/guides", getUserGuides);
router.get("/packages", getUserPackages);
router.get("/package-details/:id", getUserPackageDetails);
router.get("/package-details-guide/:id", userPackageGuide);
router.get("/guide-details/:id", getUserGuideDetails);
router.post("/complaint", addComplaint);
router.post('/book-package',paymentOrder)
router.post('/payment/verify',verifyPayment)


export default router;
