const User = require('../models/users');
const express = require('express');
var router = express.Router();
//var app = express();

router.get('/', function(req, res) {
    User.findById({_id:req.user._id}).then((user) =>{
        if(user){
            res.render('profile', {
                title: 'User Profile',
                user: user
            });
        }
    });
});

module.exports = router;

