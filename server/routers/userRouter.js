import express from "express";
import { getUserGuides, getUserHome, getUserPackages } from "../controllers/userController.js";

const router = express.Router()

router.get('/home',getUserHome)
router.get('/guides',getUserGuides)
router.get('/packages',getUserPackages)

export default router