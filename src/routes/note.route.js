import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { createNote, deleteNote } from '../controllers/noteController.js';
const router = express.Router();



// Routes
 router.post('/create', authMiddleware,createNote );
 router.delete('/delete', authMiddleware,deleteNote);
// router.post('/login', userController.login);
// router.get('/profile', userController.getProfile);

export default router;