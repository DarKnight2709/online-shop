const express = require('express');
const pg = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const cors = require("cors");
const apiRouter = require("./routes/apiRouter");


const app = express(); // call express function()


dotenv.config({path: './.env'}); // specify the path to the env variables.

const {Pool} = pg;
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');

// middleware
const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));
// use to handling HTML form submissions (method POST) (input: username=abc&pass=123)
app.use(express.urlencoded({extended: 'false'}));
// JSON API calls (ex: fetch) (input: {"username":"abc"})
app.use(express.json());
app.use(cors());


app.use('/api', apiRouter);



app.post('/auth/register', async (req, res) => {
  const {name, email, password, password_confirm} = req.body;
  

  // db.query() code
  // check valid post

  
  try {
    const emailResult = await pool.query("SELECT email FROM users WHERE email = $1", [email]);

    const nameResult = await pool.query("SELECT username FROM users WHERE username = $1", [name]);


    // check name if it already exist in db (cannot register with the same name)
    if(nameResult.rows.length > 0) {
      return res.json({
        message: 'This name is already in use'
      });
    }
    
    // check email if it already exist in db (cannot register with the same email)
    else if(emailResult.rows.length > 0) {
      return res.json({
        message: 'This email is already in use'
      });
    }


    // check password whether it equals to password_confirm 
    else if(password !== password_confirm){
      return res.json({
        message: 'Passwords do not match!'
      });
    }
    // if it is valid add it to the database (have to hash the password) and redirect user to register page to notify of successful registration
    let hashedPassword = await bcrypt.hash(password, 8);
    try {
      const insertResult = await pool.query('INSERT INTO users(username, passwordhash, email) VALUES($1, $2, $3) RETURNING *', [name, hashedPassword, email]);
      res.json({
        message: "User registered successfully!"
      })
    } catch (error) {
      console.log(error.message);
    }
    


  } catch (error) {
    console.error(error.message);
  }
  
});


app.post('/auth/login', async (req, res) => {
  const {name, password} = req.body;
  
  // db.query() code
  // check valid post

  try {
    // check if the account already exists
    const result = await pool.query('SELECT username, passwordhash FROM users WHERE username = $1', [name])
    if(result.rows.length < 1) {
      return res.json({
        message: 'The account does not exist! You need to register!'
      });
    }

    // check if entered password is correct
    let isCorrect = await bcrypt.compare(password, result.rows[0].passwordhash);
    if(!isCorrect) {
      return res.json({
        message: 'The password is incorrect. Try again!'
      });
    }

    res.json({
      message: 'Login successfully!'
    });
  } catch (error) { 
    console.log(error.message);
  }
});



app.listen(5000, () => {
  console.log('server started on port 5000');
});





