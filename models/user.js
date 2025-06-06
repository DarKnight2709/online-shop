
const pool = require('../models/database');


exports.findByUsername = async(username) => await pool.query("SELECT username FROM users WHERE username = $1", [username]);

exports.findPasswordByUserName = async(username) => await pool.query("SELECT passwordhash FROM users WHERE username = $1", [username]);

exports.findByEmail = async (email) => await pool.query("SELECT email FROM users WHERE email = $1", [email]);

exports.addUserToDb = async (username, hashedPassword, email, phone) => await pool.query('INSERT INTO users(username, passwordhash, email, phone) VALUES($1, $2, $3, $4) RETURNING *', [username, hashedPassword, email, phone]);

