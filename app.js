// import modules, middleware
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const port = process.env.port || 3000;

//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var about = require('./routes/about');
var app = express();

require('./controllers/users')
//config
const key = require('./config/key');

mongoose.connect(key.MongoDB, { useNewUrlParser: true }).then(() => {
  console.log('Server is connect to mongo')
}).catch((err) => {
  console.log(err);
});

app.use(session({
  secret: "mysecret",
  resave: true,
  saveUninitialized: true
}));

// view engine setup
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', about);
// middlewares setup
app.use(helmet());
app.use(bodyParser.urlencoded({extended : true}))
app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.get('/auth/facebook', passport.authenticate('facebook'),
    function(req, res){
      res.send(200)
    }
);
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(function(err, req, res, next){
  res.status(404).render('404')
})
app.enable('view cache');


app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

module.exports = app;
