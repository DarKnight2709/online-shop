const { fetchCartItems, fetchItemCart, updateCartItem, addCartItem, deleteCartItem, deleteAllCartItems, updateOrderStatus, removeOrderProducts, createOrder} = require("../models/cart.js");
const {getProductById} = require("../models/products");
const { throwError } = require("../utils/index.js");
const {findOrderById} = require("../models/order.js");
const getCart = async (cartId) => {
  try {
    const cartItems = await fetchCartItems(cartId);
    let cartTotal = 0;
    for(let item of cartItems.rows) {
      cartTotal += (item.price) * (item.quantity);
    }
    const roundTotal = parseFloat(cartTotal.toFixed(2));

    return {
      cart: cartItems.rows,
      cartTotal: roundTotal
    };
  } catch (error) {
    throw new Error(error);
  }

}

exports.getCartItems = async (req, res, next) => {
  try {
    const responseObj = await getCart(req.cartId);
    return res.status(200).json(responseObj);
  } catch (error) {
    next(error);
  }

}


// handle add products to cart and 
// edit quantity of cart items
exports.addToCart = async (req, res, next) => {
  try {
    const productId = parseFloat(req.body.productid);
    let quantity = parseFloat(req.body.quantity);

    //check whether id and quantity is valid
    if(isNaN(productId) || isNaN(quantity) || productId < 0 || quantity === 0 || quantity % 1 !== 0 || productId % 1 !== 0) {             
        throwError('Bad Request', 400); 
    };

    //check if product is valid
    const checkProduct = await getProductById(productId);
    //product id is invalid or product is out of stock
    if(checkProduct.rows.length === 0 || checkProduct.rows[0].quantityinstock === 0) {
        throwError('Product not Available', 404);
    }

    // if product already exists on cart
    const checkAlreadyExists = await fetchItemCart(req.cartId, productId);

    // if product already exist on cart
    if(checkAlreadyExists.rows.length > 0) {
      const cartItem = checkAlreadyExists.rows[0];
      quantity += cartItem.quantity;
    }

    if(quantity <= 0) {
      throwError('Bad Request', 400);
    }

    // check if ordered quantity available in stock
    else if(checkProduct.rows[0].quantity < quantity) {
      throwError('Product quantity not available to Purchase', 400);
    }

    // if product already exists on cart, only update the quantity
    if(checkAlreadyExists.rows.length > 0) {
      const updated = await updateCartItem(checkAlreadyExists.rows[0].cartitemid, quantity);
      if(updated.rows.length === 0) {
        throwError("Conncection Error", 500);
      }
      return res.status(200).send('Cart Updated');

    } else {
      // add a new cartitem ot cart
      const added = await addCartItem(req.cartId, productId, quantity);
      if(added.rows.length === 0) {
        throwError('Product failed to add', 400);
      }
      return res.status(201).send('Added Item to Cart');
    }
  } catch (error) {
    next(error);
  }
}


// remove an items from cart
exports.removeCartItem = async (req, res, next) => {
  try {
    const productId = parseFloat(req.body.productid);
        //check whether id and quantity is valid
    if(isNaN(productId) || productId < 0 || productId%1 !== 0) { 
      throwError('Bad Request', 400) 
    };

    const deleteItem = await deleteCartItem(req.cartId, productId);

    if(deleteItem.rows.length === 0) {
      throwError("Bad Request", 400);
    } else {
      res.status(204).send();
    }
  
  } catch (error) {
    next(err);
  }
}

//remove all cart items
exports.emptyCart = async (req, res, next) => {
  try {
    const emptyCart = await deleteAllCartItems(req.cartId);
    return res.status(204).send();
  } catch (error) {
    next(err);
  }
}


exports.createOrder = async (req, res, next) => {
    try {
        
        // let shippingId;
        // let billingId;
        const userId = parseInt(req.user.userid);
        
        // if(!req.body.shipping || !req.body.shipping.id || !req.body.billing || req.body.billing.sameAsShipping === undefined ) {
        //     throwError("Bad Request", 400);
        // }
        
        //set shipping address
        //user can choose already existing address id or add new address.
        // const { id: reqShipAddressId } = req.body.shipping;
        
        //check if new address to be added
        // if(reqShipAddressId == "new"){

        //     if(!isValidAddress(req.body.shipping)){
        //         throwError("Please check data again", 400);
        //     }

        //     const newShipAdd = sanitizeAdd(req.body.shipping);

        //     const newshipAddress = await addNewAddress({...newShipAdd, isDefault: false}, userId);
        //     //add error in model
        //     shippingId = newshipAddress.rows[0].id;

        // //else if existing address   
        // } else {
        //     const reqShipId = parseInt(reqShipAddressId);
        //     if(isNaN(reqShipId)){
        //         throwError('Please check shipping Address Again', 400);
        //     }
        //     const shipping = await addressByUserAndId(userId, reqShipId);
            
        //     if(shipping.rows.length === 0){
        //         throwError("Bad Request", 400);
        //     }
        //     else {
        //         shippingId = reqShipId;
        //     }
        // }
        
        //set billing address

        //billing address object of request body
        // const reqBilling = req.body.billing;

        // //check if bill address same as shipping
        // if(reqBilling.sameAsShipping){
        //     billingId = shippingId;
        
        // } else {
        //     //check if new address to be added
        //     if(reqBilling.id == "new"){

        //         if(!isValidAddress({...req.body.billing, sameAsShipping:'false'})){
        //             throwError("Please check data again", 400);
        //         }
               
        //         const newBillAdd = sanitizeAdd({...req.body.billing, sameAsShipping:'false'});
            
        //         const newbillAddress = await addNewAddress({...newBillAdd, isDefault: false}, userId);
        //         //add error in model
        //         billingId = newbillAddress.rows[0].id;
              
        //     //else if existing address 
        //     } else {
        //         const reqBillId = parseInt(reqBilling.id);
        //         if(isNaN(reqBillId)){
        //             throwError('Please check billing Address Again', 400);
        //         }
        //         const billing = await addressByUserAndId(userId, reqBillId);
        //         if(billing.rows.length === 0){
        //             throwError("Bad Request", 400);
        //         }
        //         else {
        //             billingId = reqBillId;
        //         }
        //     }
        // }

        //get cartTotal 
        const cartObj = await getCart(req.cartId);
        const { cartTotal } = cartObj;

        if(cartTotal === 0){
            throwError('Cart is Empty', 404);
        }

        //create order in orders
        //copy products to orders_products
        //remove cart_products items       
        const orderId = await createOrder(req.cartId, userId, cartTotal,);
        
        if(orderId.rows.length === 0){
            throwError("Failed", 400);
        } 

        //create Stripe Payment Intent
        // const intent = await stripe.paymentIntents.create({
        //     // To allow saving and retrieving payment methods, provide the Customer ID.
        //     amount: parseInt(cartTotal * 100),
        //     currency: 'usd',
        //     metadata: {
        //         order_id: orderId.rows[0].id.toString(),
        //         customer_id: userId.toString(),

        //     }
        //     //automatic_payment_methods: {enabled: true},
        //   });
                          
        return res.status(203).json({orderId: orderId.rows[0].orderid});

    } catch(err){
        next(err);
    }
}



//stripe payment failed
//update order status to failed
//delete items of the failed order id in order_products table
exports.paymentFailed = async (req, res, next) => {
    try {
        const orderId = parseInt(req.body.orderId);

        if(isNaN(orderId)){
            throwError('Bad Request', 400);
        }
        //const userId = parseInt(req.user.id);
        const orderExists = await findOrderById(orderId);
        
        if(orderExists.rows.length === 0){
            throwError('Order Not Found', 404);
        }

        const orderFailed = await updateOrderStatus(orderId, 'failed');

        //remove items in orders_products table
        const deleteOrderProducts = await removeOrderProducts(orderId);

        return res.status(200).send();

    } catch(err) {
        next(err);
    }
}