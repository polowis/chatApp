// import modules, middleware
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const port = 3000;

//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var about = require('./routes/about');
var app = express();

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
// middlewares setup
app.use(helmet())
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.enable('view cache');


app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

module.exports = app;
