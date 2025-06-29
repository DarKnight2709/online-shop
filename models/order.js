const pool = require('./database');

//get all orders
// const fetchOrders = (userId) => pool.query('SELECT orderid, orderdate as date, total, status FROM orders WHERE userid = $1', [userId]);

const fetchOrders = (userId) => {
  return pool.query(`
    SELECT 
      o.orderid,
      o.orderdate AS date,
      o.total,
      o.status,
      op.orderedQuantity,
      p.imageURL,
      p.productName,
      p.price
    FROM Orders o
    JOIN Orders_Products op ON o.orderid = op.orderid
    JOIN Products p ON op.productid = p.productid
    WHERE o.userid = $1
    ORDER BY o.orderdate DESC
  `, [userId]);
};


const getAllOrdersWithDetails = () => {
  const query = `
    SELECT 
      o.orderid, o.orderdate, o.total, o.status,
      u.userid, u.username, u.email, u.address, u.phone,
      json_agg(
        json_build_object(
          'productID', p.productid,
          'productName', p.productname,
          'orderedQuantity', op.orderedquantity,
          'unitPrice', p.price
        )
      ) AS products
    FROM orders o
    JOIN users u ON o.userid = u.userid
    JOIN orders_products op ON o.orderid = op.orderid
    JOIN products p ON op.productid = p.productid
    GROUP BY o.orderid, u.userid
    ORDER BY o.orderdate DESC
  `;

  return pool.query(query);
};


// find order by userid and order id
const findOrderByUserId = (orderId, userId) => pool.query('SELECT orderid, orderdate as date, total, status FROM orders WHERE orderid = $1 AND userid = $2', [orderId, userId]);

// find order by order id
const findOrderById = (orderId) => pool.query('SELECT orderid, orderdate as date, total, status FROM orders WHERE orderid = $1', [orderId]);

//get single order data
const fetchSingleOrder = (orderId) => {
    return pool.query("SELECT products.productid as id, products.productname as name, orders_products.orderedquantity as quantity FROM products JOIN orders_products ON products.productid = orders_products.productid WHERE orderid = $1", [orderId]);
}

module.exports = { fetchOrders, findOrderById, findOrderByUserId, findOrderByUserId, fetchSingleOrder, getAllOrdersWithDetails }; 