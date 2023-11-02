import express from 'express';
import router from './routes/main.js';
import expressEjsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import db from './config/mongoose.js';
import session from 'express-session';
import passport from 'passport';
 import passportLocal from './config/passport-local.js';
 import passportJWT from './config/passport-jwt.js';

import MongoStore from 'connect-mongo';
import nodeSassMiddleware from 'node-sass-middleware';
import flash from 'connect-flash';
import middleware from './config/middleware.js';
import path from 'path';
import passportgoogle from './config/passport.google.oauth2.js';

import {createServer} from 'node:http';
import { chatSockets } from './config/chats_socket.js';
import env from './config/enviornment.js';


import logger from 'morgan';

const app = express();

// import viewhelper from './config/view.helpers.js';
// viewhelper(app);

export const chatServer = createServer(app);
chatSockets(chatServer);



const sessionStore = new MongoStore({
    mongoUrl: 'mongodb://localhost:27017/codeial_db',
    mongooseConnection: db,
    autoRemove: 'disabled'
}, (err) => {
    if (err) {
        console.error('MongoStore Error:', err);
    }
});


// app.use(nodeSassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug:true,
//     outputStyle: 'extended',
//     prefix: ''
// }));

//? using urlencoded for post request decoding data
app.use(express.urlencoded({extended: true}));

//? using cookie parser
app.use(cookieParser());




// ? extracting styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//? using static files
app.use('/assets',express.static(env.asset_path));

//? make the uploads path available to the browser
app.use('/uploads',express.static("./uploads"));

app.use(logger(env.morgan.mode, env.morgan.options));


//? Use EJS Layouts
app.use(expressEjsLayouts);




// ? Set up the view engine

app.set('view engine', 'ejs');
app.set('views', './views');


// ? settting up sessions

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployement 
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    cookie: {
        maxAge: (1000*60*100)
    }
}));

// Initialize connect-flash middleware


// ? Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(middleware.setFlash);

// ? Use Express router
app.use('/', router);

export default app;