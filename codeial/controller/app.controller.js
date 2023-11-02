import post from "../model/post.js";
import user from "../model/users.js";


export  default class AppController {
    static RenderHome(req, res) {
        post.find({})
            .sort('-createdAt') 
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate:{
                    path: 'likes'
                }

            }).populate('likes')
            .populate('comments')
            .then(posts => {
                user.find({})
                .then(users=>{
                    return res.render('home', {
                        title: "Home",
                        posts: posts,
                        all_users: users
                    });
                })
                
            })
            .catch(err => {
                // Handle any errors that may occur during the query
                // Respond with an error page or appropriate error handling
                res.status(500).send("Internal Server Error");
            });
     
    }
    
    
}