require('dotenv').config(); // access .env file in this file

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');
const app = express(); // factory function which create instance 
const PORT = 5000 || process.env.PORT;

// Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
// express.urlencoded() is a built-in middleware provided by Express.js for parsing URL-encoded
//  data in incoming requests. This middleware is typically used to parse data submitted 
// through HTML forms with the "application/x-www-form-urlencoded" content type.

// { extended: true } is an options object passed to express.urlencoded(). 
// When extended is set to true, it allows for parsing nested objects and arrays in the 
// URL-encoded data. When set to false, only simple key-value pairs are parsed

app.use(express.json());

// express.json() is a built-in middleware provided by Express.js for parsing JSON data
//  in incoming requests. It automatically parses the request body if the 
// Content-Type header of the request indicates JSON data (e.g., "application/json").

app.use(cookieParser());


app.use(express.static('public'));  // middleware

app.use(expressLayout);
app.set('layout', './layouts/main');  //setter   default layout
app.set('view engine', 'ejs');  

app.use('/',require('./server/routes/main'));
app.use('/',require('./server/routes/adminRoutes'));
// require('./server/routes/main')

app.locals.isActiveRoute = isActiveRoute; 
// In Express.js, the app.locals object is used to store data that is accessible
// across all routes and views in your application.


app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
});






