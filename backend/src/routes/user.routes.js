import express from 'express';
import { getProfile, updateProfile, logout } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { uploadProfileImage } from '../config/cloudinary.js';

const router = express.Router();

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, uploadProfileImage.single('profilePicture'), updateProfile);
router.post('/logout', verifyToken, logout);

export default router;