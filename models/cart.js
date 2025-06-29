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


//mark order as succesfull; payment successfull
exports.updateOrderStatus = (orderId, newStatus) => pool.query('UPDATE orders SET status = $1 WHERE orderid = $2', [newStatus, orderId]);

//remove Order products in case of payment fail
exports.removeOrderProducts = (orderId) => pool.query('DELETE FROM orders_products WHERE orderid = $1', [orderId]);


//create order in orders
//copy products to orders_products
//remove cart_products items
exports.createOrder = async (cartId, userId, orderTotal, shipId, billId) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const order = await client.query('INSERT INTO orders (userid, orderdate, total, status) VALUES ($1, to_timestamp($2), $3, $4) RETURNING orderid', [userId, Date.now()/1000.00, orderTotal, 'pending']);
        
        const orderProducts = await client.query('INSERT INTO orders_products (orderid, productid, orderedquantity) SELECT $1, productid, quantity FROM CartItems WHERE cartid=$2 RETURNING orderid', [order.rows[0].orderid, cartId]);

        //const deleted = await client.query('DELETE FROM cart_products WHERE cart_id = $1 RETURNING id', [cartId]);
        
        if(orderProducts.rows.length === 0 || order.rows.length === 0) {
            throw new Error("Database Connection Error");
        } 
        
        await client.query('COMMIT'); 
        
        return order;          

    } catch(e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

