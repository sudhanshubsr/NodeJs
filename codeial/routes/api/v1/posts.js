import express from "express";
import PostAPI from "../../../controller/api/v1/posts.api.js";
const router = express.Router();
import passport from 'passport';
router.get("/", PostAPI.index);
router.delete("/:id",passport.authenticate('jwt', {session: false}),PostAPI.deletePost);

export default router;