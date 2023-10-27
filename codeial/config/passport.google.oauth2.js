import passport from "passport";
import googleStrategy from "passport-google-oauth20";   
import crypto from "crypto";
import User from "../model/users.js";
import { profile } from "console";


// passport.use(new googleStrategy({
//     clientID:"712643125861-nglibo9oln5j1di0a49a0vline287a7g.apps.googleusercontent.com",
//     clientSecret:"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",
//     callbackURL: "http://localhost:8000/users/auth/google/callback"
// },
// (accessToken,refreshToken,pofile,done)=>{
//     User.findOne({email:profile.emails.value[0]}).exec((err,user)=>{
//         if(err){console.log('error in google strategy passport', err); return;}
//         console.log(profile);

//         if(user){
//             return done(null,user);
//         }else{
//             User.create({
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 password: crypto.randomBytes(20).toString('hex')
//             }, (err,user)=>{
//                 if(err){console.log('error in creating user google strategy passport', err); return;}
//                 return done(null,user);
//             });
//         }
// }
//     )}
// ))


passport.use(new googleStrategy({
    clientID:"712643125861-nglibo9oln5j1di0a49a0vline287a7g.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            return done(null, user);
        } else {
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
            console.log(profile)
            return done(null, user);
        }
    } catch (err) {
        console.log('error in google strategy passport', err);
        return done(err);
    }
}));



export default passport;