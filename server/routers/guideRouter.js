import express from "express";
import { addPackage, getGuidePackages } from "../controllers/guideController.js";
const router = express.Router()

router.post('/add-package',addPackage)
router.get('/packages',getGuidePackages)


export default router 