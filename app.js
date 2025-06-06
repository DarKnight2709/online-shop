const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: './.env'}); // specify the path to the env variables.
const cors = require("cors");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pgPool = require("./models/database");

const passport = require("passport");
const initializePassport = require("./passport.config");


const app = express(); // call express function()



// middleware
const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));
// use to handling HTML form submissions (method POST) (input: username=abc&pass=123)
app.use(express.urlencoded({extended: 'false'}));
// JSON API calls (ex: fetch) (input: {"username":"abc"})
app.use(express.json());
app.use(cors({ origin: true, credentials: true, methods: ['GET', 'POST'] }));



// passport
initializePassport(passport);
// kích hoạt passport trong express app
app.use(passport.initialize());

// thiết lập sesion middleware
app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      tableName: 'session',
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000*60,
      sameSite: true
    }
  })
)

// Giúp Passport sử dụng session để lưu trạng thái đăng nhập
app.use(passport.session());



const apiRouter = require("./routes/apiRouter");



app.use('/api', apiRouter);

app.listen(5000, () => {
  console.log('server started on port 5000');
});





