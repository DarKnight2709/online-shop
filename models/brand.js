const pool = require('./database');

exports.findBrandById = (brandId) => pool.query('SELECT * FROM Brands WHERE brandID = $1', [brandId]);


exports.getBrands = () => pool.query('SELECT * FROM Brands');


exports.addBrand = (name) => pool.query('INSERT INTO Brands (name) VALUES ($1) RETURNING brandid', [name]);

exports.deleteBrand = (brandId) => pool.query('DELETE FROM Brands WHERE brandId = $1 RETURNING *' , [brandId]);


exports.updateBrand = (brandId, brandName) => pool.query('Update Brands SET name = $1 WHERE brandId = $2 RETURNING *', [brandName, brandId]);