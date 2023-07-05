import express from "express";
import { getUserGuides, getUserHome, getUserPackageDetails, getUserPackages } from "../controllers/userController.js";

const router = express.Router()

router.get('/home',getUserHome)
router.get('/guides',getUserGuides)
router.get('/packages',getUserPackages)
router.get('/package-details/:id',getUserPackageDetails)

export default router