const express = require('express');
const { throwError } = require('../utils');
const router = express.Router();
const {getBrand}  = require('../controllers/category');
const {getAllBrands} = require('../controllers/brands');



// get all brand with corresponding category
router.get('/', getBrand);


// get all brands
router.get('/brands', getAllBrands);

module.exports = router;