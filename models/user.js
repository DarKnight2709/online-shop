
const pool = require('../models/database');

//get all users
exports.fetchAllUsers = () => pool.query('SELECT * FROM users');

//get user by id
exports.findUserById = (id) => pool.query('SELECT userid FROM users where userid = $1',[id]);


exports.fetchUserInfo = async (userId) => pool.query('SELECT userid, username, email, phone, address FROM users WHERE userid = $1', [userId]);

exports.findByUsername = async(username) => await pool.query("SELECT username FROM users WHERE username = $1", [username]);

exports.findPasswordByUserName = async(username) => await pool.query("SELECT passwordhash FROM users WHERE username = $1", [username]);

exports.findByEmail = async (email) => await pool.query("SELECT email FROM users WHERE email = $1", [email]);

//to check whether the email exists on other accounts other than current account
exports.findByEmailNot = (email, id) => pool.query('SELECT userid FROM users where email = $1 AND userid != $2', [email, id]);

exports.addUserToDb = async ({username, hashedPassword, email, phone, address}) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const addedUserId = await client.query('INSERT INTO users(username, passwordhash, email, phone, address, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING userid', [username, hashedPassword, email, phone, address, "user"]);


    const addCart = await client.query(`INSERT INTO Carts (userid) VALUES (${addedUserId.rows[0].userid}) RETURNING cartid`);

    if(addedUserId.rows.length === 0 || addCart.rows.length === 0) {
      throw new Error("Database Connection Error");
    }
    await client.query("COMMIT");
    return addedUserId.rows[0].id;

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }


}


//update user info in user table
exports.updateUserInfo = ({ userid, username, email, phone, address }) => {
  const fields = [];
  const values = [];
  let i = 1;

  if (username !== undefined) {
    fields.push(`username = $${i++}`);
    values.push(username);
  }
  if (email !== undefined) {
    fields.push(`email = $${i++}`);
    values.push(email);
  }

  // Luôn cập nhật phone và address (kể cả khi là null)
  fields.push(`phone = $${i++}`);
  values.push(phone === undefined ? null: phone);

  fields.push(`address = $${i++}`);
  values.push(address == undefined ? null: address);

  // WHERE clause
  values.push(userid);
  const sql = `UPDATE users SET ${fields.join(', ')} WHERE userid = $${i} RETURNING userid, username, email`;

  return pool.query(sql, values);
};


//change password
exports.updatePassword = (id, password) => pool.query('UPDATE users SET passwordhash = $1 WHERE userid = $2 RETURNING userid', [password, id]);