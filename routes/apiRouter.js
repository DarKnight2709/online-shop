const express = require('express');
// create a middle router
const router = express.Router();
const authRouter = require('./auth');
const bodyParser = require('body-parser');


//bodyparser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.use('/auth', authRouter);

module.exports = router;


