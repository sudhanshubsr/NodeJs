import express from 'express';
import AppController from '../controller/app.controller.js';
import usersRouter from './users.js';
import accountController from '../controller/account.controller.js';
import postRouter from './posts.js'

const router = express.Router();



router.get('/', AppController.RenderHome);

router.use('/users', usersRouter);
router.use('/post', postRouter);

export default router;