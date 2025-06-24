const pool = require('./database');

exports.findBrandById = (brandId) => pool.query('SELECT * FROM Brands WHERE brandID = $1', [brandId]);


exports.getBrands = () => pool.query('SELECT * FROM Brands');