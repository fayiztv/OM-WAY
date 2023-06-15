import express from "express";
import { checkGuideLoggedIn, guideLogin, guideLogout, guideRegister } from "../controllers/guideAuthController.js";
const router = express.Router()

router.post('/register',guideRegister)

export default router 