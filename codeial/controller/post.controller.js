import post from "../model/post.js";
import flash from 'connect-flash';
import Comment from "../model/comments.js";

export default class PostController {

    static async createPost(req, res) {
        if(req.user._id){
            const content = req.body.content;   
            if(content == ''){
                req.flash('error','Post cannot be empty');
                return res.redirect('back');
            }else{
               let Post =  await post.create({
                    content: req.body.content,
                    user: req.user._id
                    
                });
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post: Post,
                            username: req.user.name
                        },
                        message: "Post created"
                    });
                }
                req.flash('success','Post Created');
            }}
        else{
            return res.redirect('back');
        }
        return res.redirect('back');
    }

    static async deletePost(req,res){
        try{
        const Post = await post.findById(req.params.id);
        console.log(Post);
        if (!Post) {
            return res.status(404).send("Post not found");
        }
        //? .id means converting the object id into string
        if(Post.user == req.user.id){
            await Post.deleteOne();
            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            req.flash('success','Post and associated comments deleted');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }

}   