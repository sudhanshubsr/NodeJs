import user from "../model/users.js";

export default class accountController {
  static RenderLogin(req, res) {
    if(req.isAuthenticated()){
     return res.redirect('/users/profile')
    }
    return res.render("login_page", {
      title: "Login",
    });
  }

  static RenderSignup(req, res) {

    if(req.isAuthenticated()){
     return res.redirect('/users/profile')
    }
    return res.render("signup_page", {
      title: "Signup",
    });
  }

  static async create(req, res) {
    if (req.body.password !== req.body.confirm_password) {
      req.flash('error','Passwords do not match');
      return res.redirect('back');
    }
  
    try {
      const existingUser = await user.findOne({ email: req.body.email });
      
      if (!existingUser) {
        user.create(req.body);
        req.flash('success','Account Created Successfully');
        return res.redirect('/users/login');

      } else {
        req.flash('error','Email already registered');
        return res.redirect('back');
      }
    } catch (err) {
      req.flash('error',err);
      return res.status(500).send('Internal Server Error');
    }
  }

  static async createSession(req, res) {
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
  }

    static destroySession(req,res){
      req.logout((err)=>{
        if(err){
        console.log('Error in destroying session',err);
        }else{
          req.flash('success','Logged out Successfully')
          return res.redirect('/');
        }
      });
      

    }
  
}
