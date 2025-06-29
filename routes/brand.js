const express = require('express');
const { throwError } = require('../utils');
const router = express.Router();
const {getBrand}  = require('../controllers/category');
const {getAllBrands, addNewBrand, deleteBrand, editBrand} = require('../controllers/brands');
const {findBrandById} = require('../models/brand');

router.param('brandId', async (req, res, next, id) => {
  try {
    let brandId = parseInt(id);
    if(isNaN(brandId)) {
      throwError('Bad request', 404);
    }
    
    const found = await findBrandById(brandId);
    if(found.rows.length > 0) {
      req.brandId = brandId;
      next();
    } else {
      throwError('Brand Not Found', 404);
    }

  } catch (error) {
    next(error);
  }
});

// get all brand with corresponding category
router.get('/', getBrand);


// get all brands
router.get('/brands', getAllBrands);

// add new brand
router.post('/', addNewBrand);

// edit brand
router.put('/:brandId', editBrand);

// delete brand
router.delete('/:brandId', deleteBrand);

module.exports = router;