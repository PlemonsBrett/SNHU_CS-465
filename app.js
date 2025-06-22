// app.js - Updated with CORS configuration and authentication

const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { engine } = require('express-handlebars');

// Load environment variables
require('dotenv').config();

// Bring in the database - Connect to DB
require('./app_api/models/db');

// Import models to register schemas
require('./app_api/models/travlr');
require('./app_api/models/user');

const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');

// Wire in our authentication module
const passport = require('passport');
require('./app_api/config/passport');

const app = express();

// View engine setup
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'app_server/views/layouts'),
  partialsDir: path.join(__dirname, 'app_server/views/partials'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server/views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// CORS configuration for Angular admin app
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Wire-up routes to controllers
app.use('/', indexRouter);
// Wire-up API routes
app.use('/api', apiRouter);

// Verify JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET environment variable is not set. Authentication will not work properly.');
  process.exit(1);
}

// Handle JWT and authorization errors
app.use((err, req, res, next) => {
  // Handle express-jwt authentication errors
  if (err.name === 'UnauthorizedError' || 
      err.name === 'JsonWebTokenError' ||
      err.name === 'TokenExpiredError') {
    
    console.error('Authentication error:', err.message);
    return res.status(401).json({
      status: 'error',
      statusCode: 401,
      message: 'Unauthorized: Invalid or expired token',
      error: err.message
    });
  }

  // Handle other JWT-related errors
  if (err.name === 'NotBeforeError') {
    console.error('Token not yet valid:', err.message); 
    return res.status(401).json({
      status: 'error',
      statusCode: 401,
      message: 'Token not yet active',
      error: err.message
    });
  }

  // Pass other errors to next error handler
  next(err);
});

// catch 404 and forward to error handler
app.use(function handle404(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function errorHandler(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});