const { getCartId } = require('./models/cart');

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