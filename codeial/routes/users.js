import express from 'express';
import userController from '../controller/users.controller.js';
import accountController from '../controller/account.controller.js';
import PostRouter from './posts.js';

const router = express.Router();

router.get('/profile', userController.profile);
router.get('/login',accountController.RenderLogin);
router.get('/signup',accountController.RenderSignup);

router.post('/create',accountController.create);

router.use('/profile', PostRouter);

export default router;

