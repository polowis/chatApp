var express = require('express');
var router = express.Router();
const {requireLogin, ensureGuest} = require('../helpers/auth');

/* GET home page. */
router.get('/', ensureGuest, function(req, res, next) {
  res.render('index', { title: 'Express', layout: null});
});

module.exports = router;
