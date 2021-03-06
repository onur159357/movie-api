const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const {categoryPost, categoryGet, categoryGetId, categoryUpdate, categoryDelete} = require('./routes/category/categories');
const {moviePost, movieGetList, movieGetId, moviePutId, movieDeleteId, movieGetTop10, movieBetweenGet} = require('./routes/movie/movies');
const {directorPost, directorGet, directorGetId, directorPutId, directorDeleteId, directorBetweenAge, directorBetweenRate} = require('./routes/director/director');

const app = express();

//Helper db
const db = require('./helper/db')();

// view engine setup
app.engine('hbs', hbs({
  extname : "hbs", 
  defaultLayout : "layout", 
  layoutsDir: __dirname + "/views/layouts/" 
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
//uploads izin
app.use('/uploads', express.static('uploads'));
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryPost, categoryGet, categoryGetId, categoryUpdate, categoryDelete);
app.use('/movie', moviePost, movieGetTop10, movieBetweenGet, movieGetList, movieGetId, moviePutId, movieDeleteId);
app.use('/director', directorPost, directorGet, directorGetId, directorPutId, directorDeleteId, directorBetweenAge, directorBetweenRate);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
