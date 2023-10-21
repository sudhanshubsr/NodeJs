import express from 'express';
import PostController from '../controller/post.controller.js';
const router = express.Router();


router.get('/posts',PostController.getPosts);

export default router;