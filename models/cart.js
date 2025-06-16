const pool = require("./database");

// get cart id for user 
exports.getCartId =  (userId) =>  pool.query('SELECT cartid FROM Carts WHERE userid = $1', [userId]);


// get cart item details
exports.fetchCartItems = (cartId) => pool.query('SELECT products.productid, products.productname, products.price, products.imageurl, cartitems.quantity FROM products JOIN cartitems ON products.productid = cartitems.productid WHERE cartid = $1', [cartId]);



// get cart item by cartId and productId
exports.fetchItemCart = (cartId, productId)=> pool.query('SELECT cartItemID, quantity FROM CartItems WHERE cartID = $1 AND productID = $2', [cartId, productId]);



// update cart item
exports.updateCartItem = (cartItemId, quantity) => pool.query('UPDATE CartItems SET quantity = $1 WHERE cartItemID = $2 RETURNING cartItemID', [quantity, cartItemId]);



// add cart item
exports.addCartItem = (cartId, productId, quantity) => pool.query('INSERT INTO CartItems (cartId, productId, quantity) VALUES ($1, $2, $3) RETURNING *', [cartId, productId, quantity]);


// delete cart item
exports.deleteCartItem = (cartId, productId) => pool.query('DELETE FROM CartItems WHERE cartID = $1 AND productID = $2 RETURNING *', [cartId, productId])


// empty cart
exports.deleteAllCartItems = (cartId) => pool.query('DELETE FROM CartItems WHERE cartID = $1 RETURNING *', [cartId]);
