import mongoose from "mongoose";
import multer from "multer";
import path from "path";

const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
          
    },
    friendships:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship'
        }
    ]
    
},{timestamps: true});


let storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, path.join(path.resolve(),"",AVATAR_PATH));
    },
    filename: (req, file, cb)=>{
        // ? file.fieldname is avatar which is defined in the schema
        cb(null, file.fieldname + '-' + Date.now())
    }
});

//static method


userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;
const user = mongoose.model('user', userSchema);  

export default user;

