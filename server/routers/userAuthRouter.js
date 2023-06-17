import express from "express";
import { checkUserLoggedIn, forgot, resetUserPassword, userLogin, userLogout, userRegister, userRegisterVerify, verifyForgot} from "../controllers/userAuthController.js";

const router = express.Router()

router.post('/sign-up',userRegister)
router.post('/register/verify',userRegisterVerify)
router.post('/login',userLogin)
router.get('/check',checkUserLoggedIn)
router.get('/logout',userLogout)
router.post('/forgot-password',forgot)
router.post('/forgot-password/verify',verifyForgot)
router.post('/forgot-password/reset',resetUserPassword) 


export default router




