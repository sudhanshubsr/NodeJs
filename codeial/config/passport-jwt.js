import passport from 'passport';

import JWTStrategy from 'passport-jwt';
import ExtractJwt from 'passport-jwt';
import User from '../model/users.js';
import env from './enviornment.js';

let opts = {
    jwtFromRequest: ExtractJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret,
}


passport.use(new JWTStrategy.Strategy(opts, (jwtPayLoad, done) => {
    User.findById(jwtPayLoad._id, (err, user)=>{
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }
        if(user){
            return done(null, user);
    }else{
        return done(null, false);
    }
})
}))

export default passport;