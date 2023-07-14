import express from 'express';
import { getAcceptRegistration, getAdminComplaints, getAdminGuides, getAdminRegistrations, getAdminUsers, getBlockGuide, getBlockUser, getRejectRegistration, getunBlockGuide, getunBlockUser } from '../controllers/adminController.js';

const router = express.Router()

router.get('/users',getAdminUsers)
router.patch('/users/block',getBlockUser)
router.patch('/users/unblock',getunBlockUser)
router.get('/guides',getAdminGuides)
router.patch('/guide/block',getBlockGuide)
router.patch('/guide/unblock',getunBlockGuide)
router.get('/registrations',getAdminRegistrations)
router.patch('/registration/accept',getAcceptRegistration)
router.post('/registration/reject',getRejectRegistration)
router.get('/complaints',getAdminComplaints)

export default router
