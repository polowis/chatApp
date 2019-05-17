const User = require('../models/users');
const express = require('express');
var router = express.Router();
//var app = express();

router.get('/', function(req, res) {
    User.findById({_id:req.user._id}).then((user) =>{
        if(user){
            user.online = true;
            user.save((err, user) => {
                if(err){
                    throw err;
                }
                else{
                    res.render('profile', {
                        title: 'User Profile',
                        user: user,
                    });
                }
            })
            console.log(user.email)
            
        }
    });
});

module.exports = router;

