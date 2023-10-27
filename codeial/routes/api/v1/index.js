import express from "express";
import posts from "./posts.js"
import users from "./users.js"
const router = express.Router();



router.use('/posts', posts);
router.use('/users', users);

export default router;