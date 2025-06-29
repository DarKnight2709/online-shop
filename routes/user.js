const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// const addressRouter = require('./address');
const ordersRouter = require('./order');


const { findUserById } = require('../models/user');
const { getAllUsers, changePassword, editUserInfo, getUserInfo } = require('../controllers/user');
const { throwError } = require('../utils');
const { checkValidationResults, isLoggedIn, isAccountOwner } = require('../middleware');

router.use('/:userId', isLoggedIn, isAccountOwner);

router.param('userId', async (req, res, next, id) => {
    let userId = parseInt(id);
    try {
        //check if user exists
        const found = await findUserById(userId);

        if(found.rows.length > 0){
            req.accountId= parseInt(found.rows[0].userid);
            next();
        } else {
            throwError('User Not Found', 404);
        }
    } catch(err) {
        next(err);
    }
    
})

//adddress router
// router.use('/:userId/address', addressRouter);

//orders router
router.use('/:userId/orders', ordersRouter);

//get all users
//router.get('/', getAllUsers);

//get user info
router.get('/:userId', getUserInfo);

//edit user info
router.put('/:userId',  
    checkValidationResults, 
    editUserInfo
);

//edit password
router.put('/:userId/edit', 
    [body('password').trim().isStrongPassword({minLength: 6,minUppercase: 0, minLowercase: 0, minSymbols: 0})], 
    checkValidationResults, 
    changePassword);

module.exports = router;