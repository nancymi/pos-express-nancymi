var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');
var cart = require('./routes/cart');
var receipt = require('./routes/receipt');
var history = require('./routes/history');

var app = express();

var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

switch (app.get('env')) {
  case 'development':
        mongoose.connect('mongodb://nancymi:wmyyzyq1314@ds011419.mlab.com:11419/pos_express_nancymi', opts);
        break;
  case 'production':
        mongoose.connect('mongodb://nancymi:wmyyzyq1314@ds011419.mlab.com:11419/pos_express_nancymi', opts);
        break;
  default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/cart', cart);
app.use('/receipt', receipt);
app.use('./history', history);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
