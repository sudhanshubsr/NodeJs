import express from 'express';
import AppController from '../controller/app.controller.js';
import usersRouter from './users.js';

const router = express.Router();

console.log('Main Router loaded');

router.get('/', AppController.RenderHome);
router.use('/users', usersRouter);


export default router;