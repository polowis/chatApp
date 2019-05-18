const express = require('express');
const User = require('../models/users');
var router = express.Router();

router.get('/', function(req, res)  {
    User.findById({_id:req.user._id}).then((user) =>{
        user.online = false;
        user.save((err, user) =>{
            if(err){
                throw(err);
            }
            if(user){
                
                req.logout();
                res.redirect('/');
            }
        })
    })
    req.logout();
    res.redirect('/')
});

module.exports = router;
