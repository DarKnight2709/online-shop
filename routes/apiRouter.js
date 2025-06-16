const express = require('express');
// create a middle router
const router = express.Router();
const authRouter = require('./auth');
const productsRouter = require('./products');
const categoryRouter = require('./category')
const cartRouter = require('./cart');


router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/category', categoryRouter);
router.use('/cart', cartRouter);


module.exports = router;


