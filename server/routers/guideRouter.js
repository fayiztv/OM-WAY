import express from "express";
import { addPackage } from "../controllers/guideController.js";
const router = express.Router()

router.post('/add-package',addPackage)


export default router 