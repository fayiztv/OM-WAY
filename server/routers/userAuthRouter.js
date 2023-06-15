import express from "express";
import { checkUserLoggedIn, forgot, resetUserPassword, userLogin, userLogout, userRegister, userRegisterVerify, verifyForgot} from "../controllers/userAuthController.js";

const router = express.Router()

router.post('/sign-up',userRegister)
router.post('/register/verify',userRegisterVerify)
router.post('/login',userLogin)
router.get('/check',checkUserLoggedIn)
router.get('/logout',userLogout)
router.post('/forgot',forgot)
router.post('/forgot/verify',verifyForgot)
router.post('/forgot/reset',resetUserPassword)

export default router
