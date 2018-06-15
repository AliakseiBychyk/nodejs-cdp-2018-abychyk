import { Router } from 'express';
import { postlogin, logout, google } from '../controllers/authController';
const router = Router();

// auth login
router.post('/login', postlogin);

// auth logout
router.get('/logout', logout);

// auth with google
router.get('/google', google);

export default router;
