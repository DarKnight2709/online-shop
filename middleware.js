const { getCartId } = require('./models/cart');
const { throwError } = require("./utils");
const {validationResult} = require('express-validator');



exports.checkValidationResults = (req, res, next) => {
    const result = validationResult(req);    
    if(!result.isEmpty()) {
        let errMessage = '';
        result.errors.forEach((errObj) =>{
            errMessage += `${errObj.type} ${errObj.path}: ${errObj.msg}\n`
        } )
        return throwError(errMessage, 400);
    } else {
        return next();
    } 
}

exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Unauthorized' }); // Không redirect
    }
    next();
};


exports.setCartId = async (req, res, next) => {
    const userId = parseInt(req.user.userid); // get values from deserialize.
    const cart = await getCartId(userId);
    req.cartId = cart.rows[0].cartid;
    return next();
}

exports.isAccountOwner = (req, res, next) => {
    if(req.user.userid !== req.accountId) {
        throwError("You are not authorized", 400);
    } else {
        return next();
    }
}