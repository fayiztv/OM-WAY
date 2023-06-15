import express from "express";
import { checkUserLoggedIn, forgot, resetUserPassword, userLogin, userLogout, userRegister, userRegisterVerify, verifyForgot} from "../controllers/userAuthController.js";

const router = express.Router()

router.post('/sign-up',userRegister)
router.post('/register/verify',userRegisterVerify)
router.post('/login',userLogin)


export default router
