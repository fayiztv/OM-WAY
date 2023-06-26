import express from "express";
import { addPackage, deletePackage, getGuidePackages, getPackageEdit } from "../controllers/guideController.js";
const router = express.Router()

router.post('/add-package',addPackage)
router.get('/packages',getGuidePackages)
router.patch('/packages/delete',deletePackage)
router.get('/edit-package/:id',getPackageEdit)

export default router 