import express from 'express';
import userController from '../controller/users.controller.js';
import PostRouter from './posts.js';

const router = express.Router();

console.log('Profile router loaded');

router.get('/profile', userController.profile);
router.use('/profile', PostRouter);

export default router;

