const User = require('../models/users');
const express = require('express');
var router = express.Router();


router.get('/profile', function(req, res, next) {
    User.findById({_id:req.user._id}).then((user) =>{
        if(user){
            res.render('profile');
        }
    });
  res.render('index');
});

module.exports = router;
