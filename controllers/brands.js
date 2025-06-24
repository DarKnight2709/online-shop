const {
  throwError
} = require("../utils");

const {getBrands} = require("../models/brand");

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