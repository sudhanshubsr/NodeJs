import express from 'express';
import AppController from '../controller/app.controller.js';

const router = express.Router();

console.log('Router loaded');

// const appController = new AppControl;

router.get('/', AppController.RenderHome);

export default router;