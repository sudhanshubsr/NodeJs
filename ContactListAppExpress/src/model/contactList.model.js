import mongoose from "mongoose";

const contactListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        
    },
    phone:{
        type: String,
        required: true
    }

});

const Contacts = mongoose.model('Contact', contactListSchema);

export default Contacts;






