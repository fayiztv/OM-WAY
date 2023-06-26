import express from "express";
import { addPackage, deletePackage, getGuidePackages, getPackageEdit, postEditPackage } from "../controllers/guideController.js";
const router = express.Router()

router.post('/add-package',addPackage)
router.get('/packages',getGuidePackages)
router.patch('/packages/delete',deletePackage)
router.get('/edit-package/:id',getPackageEdit)
router.post('/edit-package',postEditPackage)

export default router 