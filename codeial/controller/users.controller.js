export default class userController {
    static profile(req, res) {
        return res.render('user_profile',{
            title: "Profile"
        });
    }
}