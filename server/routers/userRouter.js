import express from "express";
import { getUserHome } from "../controllers/userController.js";

const router = express.Router()

router.get('/home',getUserHome)

export default router