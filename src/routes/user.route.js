import express from 'express';
const router = express.Router();

// Import controller
import {createUser, loginUser, profile} from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

// Routes
router.post('/register', createUser);
router.post('/login', loginUser);
// router.post('/login', userController.login);
router.get('/profile',authMiddleware, profile);

export default router;