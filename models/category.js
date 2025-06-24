const pool = require('./database');


exports.getCategories = () => pool.query('SELECT * FROM Category');

exports.addCategory = (name) => pool.query('INSERT INTO Category (name) VALUES ($1) RETURNING categoryid', [name]);

exports.findProductsByCategory = (categoryId) => pool.query('SELECT * FROM Products WHERE categoryId = $1', [categoryId]);

exports.findCategoryById = (categoryId) => pool.query('SELECT * FROM Category WHERE categoryId = $1', [categoryId]);


exports.updateCategory = (categoryId, categoryName) => pool.query('Update Category SET name = $1 WHERE categoryId = $2 RETURNING *', [categoryName, categoryId]);

exports.deleteCategory = (categoryId) => pool.query('DELETE FROM Category WHERE categoryId = $1 RETURNING *' , [categoryId]);

exports.fetchBrand = () => pool.query('SELECT DISTINCT c.categoryID AS category_id, c.name AS category_name,  b.brandID AS brand_id, b.name AS brand_name FROM Products p JOIN Category c ON p.categoryID = c.categoryID JOIN Brands b ON p.brandID = b.brandID ORDER BY c.categoryID, b.brandID');



exports.findByCategoryAndBrand = (categoryId, brandId) => pool.query('SELECT * FROM Products WHERE categoryId = $1 AND brandId = $2', [categoryId, brandId]);