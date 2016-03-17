var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var items = require('./routes/api/items');
var carts = require('./routes/api/carts');
var receipt = require('./routes/api/receipt');
var histories = require('./routes/api/histories');
var promotions = require('./routes/api/promotions');

var app = express();

var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

switch (app.get('env')) {
  case 'development':
    mongoose.connect('mongodb://localhost:27017/pos', opts);
    break;
  case 'production':
    mongoose.connect('mongodb://localhost:27017/pos', opts);
    break;
  default:
    throw new Error('Unknown execution environment: ' + app.get('env'));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/carts', carts);
app.use('/api/promotions', promotions);
app.use('/api/items', items);
app.use('/api/receipt', receipt);
app.use('/api/histories', histories);

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
