import passport from "passport";
import googleStrategy from "passport-google-oauth20";   
import crypto from "crypto";
import User from "../model/users.js";
import { profile } from "console";
import env from "./enviornment.js";


passport.use(new googleStrategy({
    clientID: env.google_clientID,
    clientSecret: env.google_client_Secret,
    callbackURL: env.google_callback_URL,
}, 

async (accessToken, refreshToken, profile, done) => {
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