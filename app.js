var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();

var app = express();


//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//require
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var user = require("./routes/users")
//use
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', user);

module.exports = app;
