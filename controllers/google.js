const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuthStrategy;
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

