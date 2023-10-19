export  default class AppController {

    static RenderHome(req, res) {
        return res.render('home', {
            title: "Home"
        });
    }


}