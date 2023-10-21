import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/codeial_db');


const db = mongoose.connection;
db.on('error',console.error.bind(console, 'Error Connecting to DB'));

db.once('open',()=>{
    console.log('Connected to DB');
})


export default db;