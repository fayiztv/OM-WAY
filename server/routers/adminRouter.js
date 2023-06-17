import express from 'express';
import { getAdminUsers, getBlockUser, getunBlockUser } from '../controllers/adminController.js';

const router = express.Router()

router.get('/users',getAdminUsers)
router.patch('/users/block',getBlockUser)
router.patch('/users/unblock',getunBlockUser)

export default router
