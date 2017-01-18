var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var chat = require('./chat/chat-routes');
var user = require('./user/user-routes');

var app = express();

// Specify Listening PORT
app.listen(3000, function() {
    console.log('App listening on the 3000 port!')
});

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Expose UI Folder
app.use(express.static(path.join(__dirname, 'public')));

// ADDING ROUTES
app.use('/', home)
app.use('/chat', chat);
app.use('/user', user);

// ERROR HANDLING
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;