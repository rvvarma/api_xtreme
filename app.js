/*var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;


*/

var nodemailer = require("nodemailer");

var http = require("http");

var nodemailer = require("nodemailer");
var email = require('mailer');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
var indexRouter = require('./routes/Sudheer_Api/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');
var usersRouters1 = require('./routes/keerthi_api/classmapping');
var usersRouters2 = require('./routes/keerthi_api/feeroute');
var usersRouters3 = require('./routes/keerthi_api/adminuseraccounts');
var usersRouters4 = require('./routes/keerthi_api/parent');
var usersRouters5 = require('./routes/keerthi_api/teacherroute');
var usersRouters6 = require('./routes/keerthi_api/transactionroute');
var usersRouterss = require('./routes/RangaraoApi/assignmentAPI');

var app = express();
var cors=require('cors')
//var Teacher= require('./models/teacher');
//var winston =require('winston')


//Db connection
var tt=mongoose.connect('mongodb://rama:rama123@ds117592.mlab.com:17592/shop',function(err,success){

  if(err)
  console.log("error")
  else {
    console.log("connected")
  }
});
var db= mongoose.connection;
console.log("working...")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'})); // to support JSON bodies
//app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users1', usersRouters1);
app.use('/users2', usersRouters2);
app.use('/users3', usersRouters3);
app.use('/users4', usersRouters4);
app.use('/users5', usersRouters5);
app.use('/users6', usersRouters6);

app.use('/assign',usersRouterss)


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

module.exports = app;
