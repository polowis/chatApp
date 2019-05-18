const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users');
const key = require('../config/key');

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) => {
        return done(err, user);
    });

});

passport.use( new googleStrategy({
    clientID: key.GoogleClientID,
    clientSecret: key.GoogleAppSecret,
    callbackURL: 'http://localhost:3000/auth/google/callback'
},(accessToken, refreshToken, profile, done) => {
    console.log(profile);
    User.findOne({google:profile.id}, (err, user) => {
        if(err){
            return done(err);
        }
        if(user){
            return done(null, user);
        }
        else{
            const newUser = {
                google: profile.id,
                username: profile.displayName,
                image: profile.photos[0].value.substring(0, profile.photos[0].value)

            }
            new User(newUser).save((err, user) => {
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, user);
                }
            })
        }
    })
}
))

