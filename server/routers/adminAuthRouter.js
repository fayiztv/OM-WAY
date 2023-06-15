import express from "express";
import { adminLogin, adminLogout, checkAdminLoggedIn } from "../controllers/adminAuthController.js";

const router = express.Router()

router.post("/login",adminLogin)

export default router