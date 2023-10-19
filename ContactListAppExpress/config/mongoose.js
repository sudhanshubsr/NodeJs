// ? Require the library
// ? Connect to the database
// ? Acquire the connection (to check if it is successful)
// ? error
// ? up and running then print the message

import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/contact_list_db');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to db'));
db.once('open', () =>{
  console.log('successfully connected to db');
}); 

export default db;