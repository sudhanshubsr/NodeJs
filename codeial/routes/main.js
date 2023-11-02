import express from 'express';
import AppController from '../controller/app.controller.js';
import usersRouter from './users.js';
import accountController from '../controller/account.controller.js';
import postRouter from './posts.js'
import commentRouter from './comments.js'
const router = express.Router();
import api from './api/index.js';
import likesrouter from './likes.routes.js'

router.get('/', AppController.RenderHome);
router.use('/users', usersRouter);
router.use('/post', postRouter);
router.use('/comments',commentRouter);
router.use('/likes',likesrouter);

router.use('/api', api);


export default router;