
const bcrypt = require('bcryptjs');
const pool = require('../models/database');
const { findByEmail, findByUsername, findPasswordByUserName, addUserToDb } = require('../models/user');
const { hashPassword, comparePassword} = require('../utils');

exports.register = async (req, res) => {
  const {username, email, phone, password, confirmPassword, address} = req.body;
  

  // db.query() code
  // check valid post

  try {

    // check username and email if it already exist in db (cannot register with the same name and email)
    const emailResult = await findByEmail(email);

    const nameResult = await findByUsername(username)


    
    if(nameResult.rows.length > 0) {
      return res.status(400).json({
        message: 'This name is already in use'
      });
    }
    
    else if(emailResult.rows.length > 0) {
      return res.status(400).json({
        message: 'This email is already in use'
      });
    }


    // check password whether it equals to confirmPassword 
    else if(password !== confirmPassword){
      return res.status(400).json({
        message: 'Passwords do not match!'
      });
    }
    // if it is valid add it to the database (have to hash the password) and redirect user to register page to notify of successful registration
    let hashedPassword = await hashPassword(password);
    try {
      const insertResult = await addUserToDb({username, hashedPassword, email, phone, address});
      res.status(201).json({
        message: "User registered successfully!"
      })
    } catch (error) {
      console.log('he')
      console.log(error.message);
      console.log('ewrw')
      return res.status(500).json({
        message: "Internal Server Error"
      });
    }
  } catch (error) {
    console.error(error.message);
  }
  
}


// dont use this function because we use Passport

// exports.login = async (req, res) => {
//   const {username, password} = req.body;
  
//   // db.query() code
//   // check valid post

//   try {
//     // check if the account already exists
//     const nameResult = await findByUsername(username);
//     if(nameResult.rows.length === 0) {
//       return res.json({
//         message: 'The account does not exist! You need to register!'
//       });
//     }


//     // check if entered password is correct
//     const hashedPassword = (await findPasswordByUserName(username)).rows[0].passwordhash;
//     let isCorrect = await comparePassword(password, hashedPassword);
//     if(!isCorrect) {
//       return res.json({
//         message: 'The password is incorrect. Try again!'
//       });
//     }

//     res.json({
//       message: 'Login successfully!'
//     });
//   } catch (error) { 
//     console.log(error.message);
//   }
// }