import express from 'express';
import PostController from '../controller/post.controller.js';
const router = express.Router();


router.post('/create',PostController.createPost);

export default router;