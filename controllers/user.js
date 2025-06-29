const { fetchAllUsers, findByEmail, findByUsername , addUserToDb, findByEmailNot, updatePassword, updateUserInfo, fetchUserInfo, fetchUserAddresses } = require('../models/user');


const { hashPassword, throwError} = require('../utils');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await fetchAllUsers();
        if(users.rows.length === 0 ) {
            throwError('No Users Found', 404);
        }
        return res.status(200).json(users.rows);
    } catch(err) {
        next(err);
    }
}


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


//get user account info including addresses
exports.getUserInfo = async (req, res, next) =>{
    try {

        //get user info
        const userInfo = await fetchUserInfo(req.accountId);
        if(userInfo.rows.length === 0) {
            throwError('Error Getting data', 400);
        }
        
        //get addresses for the user
        // const userAddresses = await fetchUserAddresses(req.accountId);

        let user= { personalInfo: userInfo.rows[0]};
        return res.status(200).json( user );
        
    } catch(err) {
        next(err);
    }
}


//edit user account info firstname, last name and email.
//username cannot be changed
//addresses updating handles separately
exports.editUserInfo = async (req, res, next) => {
    try {  
        const {username, email, phone, address} = req.body;

        //check if email already exists with other accounts other than this account
        const emailExists = await findByEmailNot(email, req.accountId);
        
        if(emailExists.rows.length > 0) { 
            throwError('Email with account already exists', 400)
        };
        
        const updated = await updateUserInfo({userid: req.accountId, username, email, phone, address});
        
        if(updated.rows.length === 0){
            throwError("Connection Error! Update failed", 400);
        }
        return res.status(201).send('success');

    } catch(err) {
        next(err);
    }
}

//change password
exports.changePassword = async (req, res, next) => {
    try{
        const hash = await hashPassword(req.body.password);
        const changed = await updatePassword(req.accountId, hash);
       
        if(changed.rows.length === 0) {
            throwError("Connection Error! Update failed", 400);
        }
        return res.send('Succesfully changed password');

    } catch(err){
        next(err);
    }
}


