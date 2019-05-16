const User = require('../models/users');
const key = require('../config/key');

//import modules
const passport = require('passport');
const facebook = require('passport-facebook').Strategy
const session = require('express-session');

passport.serializeUser((user, done) => {
    done(null, user.id)

})
passport.deserializeUser((id, done) => {
    User.findById(id,(err, user)=> {
        done(err, user)
    })
});
passport.use( new facebook({
    clientID: key.FaceBookID,
    clientSecret: key.FaceBookAppSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['emails', 'displayName', 'photos'] 


}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    User.findOne({facebook:profile.id}, (err, user) => {
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
                email: profile.emails,
                image: `http://graph.facebook.com/${profile.id}/photos?size=large`
            }
            new User(newUser).save((err, user) => {
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, user);
                }
            });
        }
    })
}));


