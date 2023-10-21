import express from 'express';
import AppController from '../controller/app.controller.js';
import usersRouter from './users.js';
import accountController from '../controller/account.controller.js';


const router = express.Router();



router.get('/', AppController.RenderHome);

router.use('/users', usersRouter);


export default router;