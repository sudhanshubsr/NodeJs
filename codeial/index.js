import express from 'express';
import router from './routes/routes.js';
const app = express();


// ? Use Express router
app.use('/', router);



export default app;