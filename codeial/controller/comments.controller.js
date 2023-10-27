import Comment from '../model/comments.js';
import Post from '../model/post.js';


export default class commentController{

    static async createComment(req, res){

        try{
            const post = await Post.findById(req.body.post);
            if(post){
                const comment = await Comment.create({
                    content: req.body.content,
                    post: post._id,
                    user: req.user._id
                });
                post.comments.push(comment);
                post.save();
                req.flash('success','Comment Added');
                res.redirect('back');
            }
        }
        catch(err){
            req.flash('error',err);
            res.status(500).send('Internal Server Error');
        }

    }

    static async deleteComment(req, res){
        try{
            const comment = await Comment.findById(req.params.id);
           if(comment.user == req.user.id){
              const postId = comment.post;
              await comment.deleteOne();
              Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}})
              req.flash('success','Comment Deleted');
              return res.redirect('back');
           }
        }
        catch(err){
            req.flash('error',err); 
            res.status(500).send('Internal Server Error');
        }
    }
}