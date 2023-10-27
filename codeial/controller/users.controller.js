import user from "../model/users.js";
import fs from "fs";
import path from "path";

export default class userController {
  static profile(req, res) {
  user.findById(req.params.id)
      .then((user) => {
        console.log(user);
        return res.render("user_profile", {
          title: "Profile",
          profile_user: user
        });
      })
      .catch((err) => {
        console.log("Error in finding user");
        return res.redirect("back");
      });
  }

  static async profileUpdate(req, res) {
  
    if(req.user.id == req.params.id){
      try{
        let User = await user.findById(req.params.id);
        user.uploadedAvatar(req, res, (err) => {
          if (err) {
            console.log("********Multer Error: ", err); 
          }
          User.name = req.body.name;
          User.email = req.body.email;
          if(req.file){
            if(User.avatar){
              fs.unlinkSync(path.join(path.resolve(),"",User.avatar));
            }
            // this is saving the path of the uploaded file into the avatar field in the user
            User.avatar = user.avatarPath + "/" + req.file.filename;
          }
          User.save();
          return res.redirect("back");
        });

      }catch(err){
        req.flash("error", err);
        return res.redirect("back");
      }

    }else{
      req.flash("error", "Unauthorized");
      return res.status(401).send("Unauthorized");
    }


  }
}
