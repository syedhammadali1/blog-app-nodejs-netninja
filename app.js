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
app.use(express.json());
app.use(cookieParser());


app.use(express.static('public'));  // middleware

app.use(expressLayout);
app.set('layout', './layouts/main');  //setter   default layout
app.set('view engine', 'ejs');  

app.use('/',require('./server/routes/main'));
app.use('/',require('./server/routes/adminRoutes'));
// require('./server/routes/main')

app.locals.isActiveRoute = isActiveRoute; 

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
});






