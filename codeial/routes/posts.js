import express from 'express';
import PostController from '../controller/post.controller.js';
import passportLocal from '../config/passport-local.js';
import passport from 'passport';

const router = express.Router();

router.post('/create', passport.checkAuthentication,PostController.createPost);
// router.post('/create', passport.authenticate('local', {   successRedirect: '/',failureRedirect: '/users/login', failureFlash: false }), PostController.createPost);

router.get('/delete/:id',passport.checkAuthentication, PostController.deletePost);

export default router;      