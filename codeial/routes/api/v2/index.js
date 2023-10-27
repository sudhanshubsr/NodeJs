import express from "express";
import posts from "../v2/posts.js"

const router = express.Router();


router.use('/posts', posts);

export default router;