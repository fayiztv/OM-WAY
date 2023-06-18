import express from 'express';
import { getAcceptRegistration, getAdminGuides, getAdminRegistrations, getAdminUsers, getBlockGuide, getBlockUser, getRejectRegistration, getunBlockGuide, getunBlockUser } from '../controllers/adminController.js';

const router = express.Router()

router.get('/users',getAdminUsers)
router.patch('/users/block',getBlockUser)
router.patch('/users/unblock',getunBlockUser)
router.get('/guides',getAdminGuides)
router.patch('/guide/block',getBlockGuide)
router.patch('/guide/unblock',getunBlockGuide)
router.get('/registrations',getAdminRegistrations)


export default router
