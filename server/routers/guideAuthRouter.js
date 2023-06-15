import express from "express";
import { checkGuideLoggedIn, guideLogin, guideLogout, guideRegister } from "../controllers/guideAuthController.js";
const router = express.Router()

router.post('/register',guideRegister)
router.post('/login',guideLogin)
router.get('/check',checkGuideLoggedIn)



export default router 