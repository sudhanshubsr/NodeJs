export default class PostController {

    static getPosts(req, res) {
        return res.end("<h1>Here are all your Posts</h1>");
    }

}