const express = require('express');
// create a middle router
const router = express.Router();
const authRouter = require('./auth');
const productsRouter = require('./products');
const categoryRouter = require('./category')
const cartRouter = require('./cart');
const brandRouter = require('./brand');
const userRouter = require('./user');
const paymentRouter = require('./payment');


router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/category', categoryRouter);
router.use('/cart', cartRouter);
router.use('/brand', brandRouter);
router.use('/user', userRouter);
router.use('/payments-checkout', paymentRouter);

module.exports = router;


