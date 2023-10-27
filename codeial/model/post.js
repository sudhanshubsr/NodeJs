import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    comments:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
]
},{timestamps: true});

    const post = mongoose.model('post', postSchema);
    export default post;