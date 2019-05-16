const users = require('../models/users');
const key = require('../config/key');

//import modules
const passport = require('passport');
const facebook = require('passport-facebook').Strategy
const session = require('express-session');

passport.serializeUser((user, done) => {
    done(null, user.id)

})
passport.deserializeUser((id, done) => {
    users.findById(id,(err, user)=> {
        done(err, user)
    })
});
passport.use( new facebook({
    clientID: key.FaceBookID,
    clientSecret: key.FaceBookAppSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"


}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    users.findOne({facebook:profile.id}, (err, user) => {
        if(err){
            return done(err);
        }
        if(user){
            return done(null, user)
        }
        else{
            const newUser = {
                facebook: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                image: `http://graph.facebook.com/${profile.id}/photos?size=large`
            }
            new users(newUser).save((err, user)=> {
                if(err){
                    return done(err);
                }
            });
        }
    })
}));


