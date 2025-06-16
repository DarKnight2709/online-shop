
const pool = require('../models/database');


exports.findByUsername = async(username) => await pool.query("SELECT username FROM users WHERE username = $1", [username]);

exports.findPasswordByUserName = async(username) => await pool.query("SELECT passwordhash FROM users WHERE username = $1", [username]);

exports.findByEmail = async (email) => await pool.query("SELECT email FROM users WHERE email = $1", [email]);

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

