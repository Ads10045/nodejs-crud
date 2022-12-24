var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');


var flash = require('express-flash');
var session = require('express-session');
var mysql = require('mysql');
var connection  = require('./lib/db');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const logger = require('./logger');


//const swaggerDocument = require('./swagger.json');   


const swaggerDefinition = {
  info: {
    title: 'Books Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test the book registration routes',
  },
  host: 'localhost:5000',
  basePath: '/v1',
};

const options = {
  swaggerDefinition,
  consumes: ['application/json'],    
  produces: ['application/json'],    
  apis: ['routes/*.js']
};
const swaggerDocument = swaggerJsDoc(options);





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var parseRouter = require('./routes/parse');


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}))



app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/parse', parseRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



//swagguer config




/*app.listen('3000', () => {
  console.log('Server is running on port 3000');
});*/


module.exports = app;