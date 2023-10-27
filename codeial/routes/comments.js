import express from 'express';
import passport from 'passport';
import  commentController  from '../controller/comments.controller.js';
import passportLocal from '../config/passport-local.js';

const router = express.Router();

router.post('/create', passport.checkAuthentication, commentController.createComment);

router.get('/delete/:id',passport.checkAuthentication, commentController.deleteComment);

export default router;  