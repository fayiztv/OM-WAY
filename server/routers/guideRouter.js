import express from "express";
import { addPackage, deletePackage, getGuidePackages, getGuideProfileEdit, getPackageEdit, guideEditAvatar, postEditPackage, postGuideEditProfile } from "../controllers/guideController.js";
const router = express.Router()

router.post('/add-package',addPackage)
router.get('/packages/:id',getGuidePackages)
router.patch('/packages/delete',deletePackage)
router.get('/edit-package/:id',getPackageEdit)
router.post('/edit-package',postEditPackage)
router.get('/edit-profile/:id',getGuideProfileEdit)
router.post('/edit-profile',postGuideEditProfile)
router.patch('/update-avatar',guideEditAvatar)

export default router 