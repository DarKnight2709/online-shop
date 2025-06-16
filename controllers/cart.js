const { fetchCartItems, fetchItemCart, updateCartItem, addCartItem, deleteCartItem, deleteAllCartItems} = require("../models/cart.js");
const {getProductById} = require("../models/products");
const { throwError } = require("../utils");
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
  } catch (error) {
    
  }
}