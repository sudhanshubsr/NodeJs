// ! There are particular steps to setup a express app
// ? 1. Create a express app
// ? 2. Set the view engine to ejs
// ? 3. Set the views directory
// ? 4. Use express-ejs-layouts
// ? 5. Create a route for the home page
// ? 6. Export the express app
// ? 7. Import the express app in server.js and start the server

import ejs from 'ejs';
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import ContactListController from './src/controller/contactList.controller.js';

import path from 'path';

import db from './config/mongoose.js';
import Contact from './src/model/contactList.model.js';
const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(path.resolve(),'src','views'));
app.use(express.urlencoded({extended:true}));

app.use(ejsLayouts);

const contactController = new ContactListController();

app.get('/',contactController.getContactList);
app.post('/',contactController.addContact);
app.get('/deleteContact',contactController.deleteContact);


app.use(express.static('./src/views'))
export default app;