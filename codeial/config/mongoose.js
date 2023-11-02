import mongoose from "mongoose";
import env from "./enviornment.js";

mongoose.connect(`mongodb://localhost:27017/${env.db}`);


const db = mongoose.connection;
db.on('error',console.error.bind(console, 'Error Connecting to DB'));

db.once('open',()=>{
    console.log('Connected to DB');
})


export default db;