import User from "../../../model/users.js";
import  jwt from "jsonwebtoken";


export default class userAPI{
    static async create(req,res){
        
        try{
            let user = await User.findOne({email: req.body.email});
            if(!user || user.password != req.body.password){
                return res.status(422).json({
                    message: "Invalid username or password"
                })
            }

            return res.status(200).json({
                message: "Sign in successful, here is your token, please keep it safe",
                data: {
                    token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'})
                    // ? here we are converting the user object into JSON and then signing it with the secret key"codeial" and then setting the expiry time of the token to 100000
                }
            })

        }catch(err){
            console.log('Error in finding user from JWT');
            return res.status(500).json({
                message: "Internal Server Error"
            })
    }

}
}