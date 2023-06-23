import express from "express";
import { getUserGuides, getUserHome } from "../controllers/userController.js";

const router = express.Router()

router.get('/home',getUserHome)
router.get('/guides',getUserGuides)

export default router