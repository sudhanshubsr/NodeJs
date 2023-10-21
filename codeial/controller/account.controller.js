import user from "../model/users.js";

export default class accountController {
  static RenderLogin(req, res) {
    return res.render("login_page", {
      title: "Login",
    });
  }

  static RenderSignup(req, res) {
    return res.render("signup_page", {
      title: "Signup",
    });
  }

  static async create(req, res) {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect('back');
    }
  
    try {
      const existingUser = await user.findOne({ email: req.body.email });
      
      if (!existingUser) {
        user.create(req.body);
        return res.redirect('/users/login');

      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.log('Error in signing up:', err);
      return res.status(500).send('Internal Server Error');
    }
  }

  static async createSession(req, res) {
    
  }
  
}
