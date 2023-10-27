import express from "express";
import PostAPI from "../../../controller/api/v2/posts.api.js";

const router = express.Router();

router.get("/", PostAPI.index);


export default router;