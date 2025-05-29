const dotenv = require('dotenv');
const pg = require('pg');
const cors = require("cors");
const express = require("express");

const app = express();


// use to handling HTML form submissions (method POST) (input: username=abc&pass=123)
app.use(express.urlencoded({extended: 'false'}));
// JSON API calls (ex: fetch) (input: {"username":"abc"})
app.use(express.json());
app.use(cors());



dotenv.config({path: './.env'}); // specify the path to the env variables.


const {Pool} = pg;
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

module.exports = pool;