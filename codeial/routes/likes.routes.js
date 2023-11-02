import express from 'express';
import LikesController from '../controller/likes.controller.js';

const router = express.Router();

router.post('/toggle', LikesController.toggleLike);

export default router;
    