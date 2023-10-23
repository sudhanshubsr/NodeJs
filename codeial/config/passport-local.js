import passport from "passport";
import passportLocal from "passport-local";
import User from "../model/users.js";

passport.use(new passportLocal.Strategy({
    usernameField: 'email'
    },
    function(email, password, done) {
        // Find a user and establish the identity
        // If not found or password is wrong then return done(null, false)
        // If found then return done(null, user)

        User.findOne({ email: email })
            .then((user) => {
                if (!user || user.password !== password) {
                    return done(null, false, { message: 'Incorrect email or password' });
                } else {
                    return done(null, user);
                }
            })
            .catch((err) => {
                console.log('Error in finding user --> Passport');
                return done(err);
            });
    }
));

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then((user) => {
            if (!user) {
                return done(null, false); // User not found
            }
            return done(null, user);
        })
        .catch((err) => {
            console.log('Error in finding user --> Passport');
            return done(err);
        });
});


passport.checkAuthentication = (req,res,next)=>{
    // ! IF the user is signed in, then pass on teh request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/login');
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookies and it just contains the user for views. 
        res.locals.user = req.user;
    }
    next();
}

export default passportLocal;