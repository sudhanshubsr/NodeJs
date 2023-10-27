import express from "express";
import usersAPI from "../../../controller/api/v1/users.api.js";
const router = express.Router();



router.post('/create-session', usersAPI.create);

export default router;