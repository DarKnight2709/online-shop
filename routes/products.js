const express = require('express');
const router = express.Router();
const {getAllProducts, addNewProduct, searchProducts, getSingleProduct, editProduct, deleteProduct} = require('../controllers/products');
const {getProductById}  = require('../models/products');


// router params 
// for each router has :productID appearing in the url, this middleware will run before the route handler.
// advantage: reuse code

router.param('productId', async (req, res, next, id) => {
  try {

    // check id is integer
    const productId = parseInt(id);
    if(isNaN(productId)) {
      return res.status(400).json(
        { message: 'Product Not Found'}
      );
    }

    // check if product exists 
      const products = await getProductById(productId);
      if (products.rows.length === 0) {
        return res.status(400).json({
          message: 'Product Not Found'
        });
      } 
        
      req.product = products.rows[0];
      next();
  } catch (error) {
    next(error);
  }
})




// get all products
router.get('/', getAllProducts);


// search products
router.get('/search', searchProducts);




// get product by id
router.get('/:productId', getSingleProduct);



// need a middleware to check if user is admin or not

// 1.add new product
router.post('/', addNewProduct);


// 2.edit product 
router.put('/:productId', editProduct);


// 3.delete product 
router.delete('/:productId', deleteProduct);



module.exports = router;