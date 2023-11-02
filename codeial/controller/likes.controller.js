// import Like from "../model/likes.model.js";
// import Post from "../model/post.js";
// import Comment from "../model/comments.js";


// export default class LikesController{
    
//     static async toggleLike(req, res) {
//         console.log(req.query);
//     try{
//         // likes/toggle/?id=fjlskdj&type=Post

//         let likeable;
//         let deleted = false;

//         if(req.query.type == 'Post'){
//             likeable = await Post.findById(req.query.id).populate('likes');
//         }else{
//             likeable = await Comment.findById(req.query.id).populate('likes');
//         }


//         let existingLike = await Like.findOne({
//             likeable: req.query.id,
//             onModel: req.query.type,
//             user: req.user._id
//         });
//         if(existingLike){
//             likeable.likes.pull(existingLike._id);
//             likeable.save();
//             existingLike.remove();
//             deleted = true;
//         }else{
//             let newLike = await Like.create({
//                 user: req.user._id,
//                 likeable: req.query.id,
//                 onModel: req.query.type
//             });

//             likeable.likes.push(newLike._id);
//             likeable.save();
   
//         }
//         return res.status(200).json({
//             message: "Request successful",
//             data: {
//                 deleted: deleted
//             }
//         });
//    }catch(err){
//         console.log(err);
//         return res.status(500).json({
//             message: "Internal Server Error"w
//         });
//     }
// }
// }




import Like from "../model/likes.model.js";
import Post from "../model/post.js";
import Comment from "../model/comments.js";

export default class LikesController {
    static async toggleLike(req, res) {
        try {
            let likeable;
            let deleted = false;

            if (req.query.type === 'Post') { // Change 'GET' to 'Post'
                likeable = await Post.findById(req.query.id).populate('likes');
            } else {
                likeable = await Comment.findById(req.query.id).populate('likes');
            }

            let existingLike = await Like.findOne({
                likeable: req.query.id,
                onModel: req.query.type,
                user: req.user._id
            });

            if (existingLike) {
                likeable.likes.pull(existingLike._id);
                likeable.save();
                existingLike.deleteOne();
                deleted = true;
                
                
            }
        
         else {
                let newLike = await Like.create({
                    user: req.user._id,
                    likeable: req.query.id,
                    onModel: req.query.type
                });

                likeable.likes.push(newLike._id);
                likeable.save();
            }

            return res.status(200).json({
                message: "Request successful",
                data: {
                    deleted: deleted
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
}
