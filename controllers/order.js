const { fetchOrders, fetchSingleOrder,getAllOrdersWithDetails } = require("../models/order");
const { throwError } = require("../utils");

exports.allOrders = async (req, res, next) => {
  try {
    const result = await fetchOrders(req.accountId);
    const rows = result.rows;

    const ordersMap = new Map();

    for (const row of rows) {
      const orderId = row.orderid;

      if (!ordersMap.has(orderId)) {
        ordersMap.set(orderId, {
          orderId: row.orderid,
          date: row.date,
          total: row.total,
          status: row.status,
          products: []
        });
      }

      ordersMap.get(orderId).products.push({
        productName: row.productname,
        price: row.price,
        quantity: row.orderedquantity,
        imageURL: row.imageurl
      });
    }

    const orders = Array.from(ordersMap.values());
    res.status(200).json(orders);

  } catch (err) {
    next(err);
  }
};




exports.getOrders = async (req, res, next) => {
  try {
    const orders = await getAllOrdersWithDetails();
    if(orders.rows.length === 0){
            throwError("Error", 500);
        }
        res.status(200).json(orders.rows);
  } catch (error) {
    next(error);
  }
};




exports.singleOrder = async (req, res, next) => {
    try {
        const orderDetails = req.order;
        const products = await fetchSingleOrder(req.order.orderid);
        if(products.rows.length === 0){
            throwError("Error", 500);
        }
        res.status(200).json({ orderDetails, products : products.rows });
    } catch(err) {
        next(err);
    }
}