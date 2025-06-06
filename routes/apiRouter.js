const express = require('express');
// create a middle router
const router = express.Router();
const authRouter = require('./auth');


router.use('/auth', authRouter);

module.exports = router;


