import post from "../model/post.js";

export  default class AppController {
    static RenderHome(req, res) {
        post.find({})
            .populate('user')
            .then(posts => {
                return res.render('home', {
                    title: "Home",
                    posts: posts
                });
            })
            .catch(err => {
                // Handle any errors that may occur during the query
                console.error(err);
                // Respond with an error page or appropriate error handling
                res.status(500).send("Internal Server Error");
            });
    }
    
    
}