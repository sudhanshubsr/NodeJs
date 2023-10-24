import post from "../model/post.js";

export default class PostController {

    static createPost(req, res) {
        if(req.user._id){
        post.create({
            content: req.body.content,
            user: req.user._id
        });}
        else{
            return res.redirect('back');
        }
        return res.redirect('back');
    }

}   