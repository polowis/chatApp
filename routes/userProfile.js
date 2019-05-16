const User = require('../models/users');
const express = require('express');
var router = express.Router();
//var app = express();

router.get('/', function(req, res) {
    User.findById({_id:req.user}).then((user) =>{
        if(user){
            res.render('profile', {
                title: 'User Profile',
                userDisplayName: user
            });
        }
    });
});

module.exports = router;
