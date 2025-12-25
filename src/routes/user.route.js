import express from 'express';
const router = express.Router();

// Import controller
import {createUser, loginUser} from '../controllers/userController.js';

// Routes
router.post('/register', createUser);
router.post('/login', loginUser);
// router.post('/login', userController.login);
// router.get('/profile', userController.getProfile);

export default router;