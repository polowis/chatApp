const User = require('../models/users');
const express = require('express');
var router = express.Router();


router.get('/profile', function(req, res) {
    User.findById({_id:req.user._id}).then((user) =>{
        if(user){
            res.render('profile', {
                title: 'User Profile',
                userDisplayName: user
            });
        }
    });
});

module.exports = router;
