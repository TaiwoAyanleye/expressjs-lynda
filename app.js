var express = require('express');
<<<<<<< HEAD
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var passengers = require('./routes/passengers');
var db = require('./model/db');
var passenger = require('./model/passengers');

var app = express();

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
app.use('/passengers', passengers);

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
=======
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('default', {
		title: 'Home',
		users: ['Ray', 'Mortem', 'James']
	});
});

app.get('/me', function(req, res) {
	res.send('@planetoftheweb');
});

app.get('/who/:name?', function(req, res) {
	var name = req.params.name;
	res.send(name + ' was here');
});

app.get('/who/:name?/:title?', function(req, res) {
	var name = req.params.name;
	var title = req.params.title;
	res.send('<p>name: ' + name + '<br>title: ' + title + '</p>');
});

app.get('*', function(req, res) {
	res.send('Bad Route');
});

var server = app.listen(3000, function() {
	console.log('Listening on port 3000')
})
>>>>>>> 78eba09a43d5c2282aad3ceef4a4a1134fb22db8
