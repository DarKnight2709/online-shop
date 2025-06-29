const {
  throwError
} = require("../utils");

const {addBrand, deleteBrand, updateBrand} = require('../models/brand');

const {
  getBrands
} = require("../models/brand");

exports.getAllBrands = async (req, res, next) => {
  try {
    const results = await getBrands();
    if (results.rows.length === 0) {
      throwError('No Brands Found', 404);
    }
    return res.status(200).json({
      brands: results.rows
    });
  } catch (error) {
    next(error);
  }
}


exports.addNewBrand = async (req, res, next) => {
  try {
    const results = await addBrand(req.body.name);

    if (results.rows.length === 0) {
      throwError('Adding new Brand Failed', 400);
    }
    return res.status(201).send(`New Brand ${req.body.name} added with id ${results.rows[0].brandid}`);
  } catch (error) {
    next(error);
  }
}

// edit brand
exports.editBrand = async (req, res, next) => {
  try {
    const brandName = req.body.name;
    const updated = await updateBrand(req.brandId, brandName);
    if (updated.rows.length === 0) {
      throwError('Database Connection Error');
    }
    return res.status(201).send(`Updated brand with id ${req.brandId}`);

  } catch (error) {
    next(error);
  }
}


// delete brand
exports.deleteBrand = async (req, res, next) => {
  try {
    const deleted = await deleteBrand(req.brandId);
    if (deleted.rows.length === 0) {
      throwError("Database connection Error");
    }
    return res.status(204).send();

  } catch (error) {
    next(error);
  }
}