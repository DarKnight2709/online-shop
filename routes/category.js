const express = require('express');
const { throwError } = require('../utils');
const router = express.Router();
const {findCategoryById} = require('../models/category');

const {findBrandById} = require('../models/brand');
const { getAllCategories, addNewCategory,getByCategory, editCategory, deleteCategory, getByCategoryAndBrand }  = require('../controllers/category');







router.param('categoryId', async (req, res, next, id) => {
  try {
    let catId = parseInt(id);
    if(isNaN(catId)) {
      throwError('Bad request', 404);
    }
    
    const found = await findCategoryById(catId);
    if(found.rows.length > 0) {
      req.categoryId = catId;
      next();
    } else {
      throwError('Category Not Found', 404);
    }

  } catch (error) {
    next(error);
  }
});

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

// get all categories
router.get('/', getAllCategories);


// add new category
router.post('/', addNewCategory);

// get products by category
router.get('/:categoryId', getByCategory);




// edit category
router.put('/:categoryId', editCategory);


// get product by category and brand
router.get('/:categoryId/:brandId', getByCategoryAndBrand);


// delete category
router.delete('/:categoryId', deleteCategory);






module.exports = router;