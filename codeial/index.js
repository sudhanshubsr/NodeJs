import express from 'express';
import router from './routes/main.js';
import expressEjsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import db from './config/mongoose.js';

const app = express();


//? using urlencoded for post request decoding data
app.use(express.urlencoded({extended: true}));

//? using cookie parser
app.use(cookieParser());


//? using static files
app.use('/assets',express.static('./assets'));

// ? extracting styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




//? Use EJS Layouts
app.use(expressEjsLayouts);


// ? Use Express router
app.use('/', router);



// ? Set up the view engine

app.set('view engine', 'ejs');
app.set('views', './views');





export default app;