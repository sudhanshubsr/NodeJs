import Post from '../../../model/post.js';
import Comment from '../../../model/comments.js';
export default class PostAPI{
    static async index(req,res){
        const postId = req.params.id;
       let post =  await Post.find({})
            .sort('-createdAt') 
            .populate('user', '-password')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    
                }
            })             
        return res.status(200).json({
            message:"List of posts",
            posts: post
        })
    }

    static async deletePost(req,res){
        try{
        const post = await Post.findById(req.params.id);
        
        //? .id means converting the object id into string
        if(Post.user == req.user.id){
            await post.deleteOne();
            await Comment.deleteMany({post: req.params.id});
            
            return res.status(200).json({
                message: "Post deleted successfully"
            });

        }else{
            return res.status(401).json({
                message: "You cannot delete this post"
            });
        }

        }
        catch(err){
            return res.status(200).json({
                message: "Internal Server Error"
            });
        }
    }

}

