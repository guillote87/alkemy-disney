var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Swagger
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerSpec ={
  definition:{
    openapi:"3.0.0",
    info:{
      title: "Alkemy Disney API",
      version:"1.0.0"
    },
    servers:[{
      url: "http://localhost:3000"
    }]
  },
  apis:[`${path.join(__dirname,"/src/routes/*.js")}`],
}


var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var charactersRouter = require("./src/routes/characters");
var moviesRouter = require("./src/routes/movies");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api-doc", swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(swaggerSpec)))



app.use('/', moviesRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', charactersRouter);


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
  res.status(err.status || 500);                                                      "Guillermo Quattrocchi"
  res.render('error');                                                                "Node Js Web Developer"
});

module.exports = app;
