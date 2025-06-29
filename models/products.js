const pool = require("./database")


// get all products
exports.fetchAllProducts = async () => await pool.query("SELECT * FROM Products");


// get product by id
exports.getProductById = async (productId) => await pool.query("SELECT * FROM Products WHERE productId = $1", [productId]);


// search products by keyword
exports.fetchProductSearch = async (keyword) => {
  const searchKeyword = `%${keyword}%`;
  return await pool.query(
    `
    SELECT 
      p.*, 
      b.name AS brandName, 
      c.name AS categoryName
    FROM Products p
    LEFT JOIN Brands b ON p.brandID = b.brandID
    LEFT JOIN Category c ON p.categoryID = c.categoryID
    WHERE 
      p.productName ILIKE $1 OR
      p.description ILIKE $1 OR
      b.name ILIKE $1 OR
      c.name ILIKE $1
    `,
    [searchKeyword]
  );
};

// add new product
exports.createNewProduct = async ({productName, description, priceTo, quantityInStockTo, imageURL, brandId, categoryId}) => {
  const query = "INSERT INTO Products (productName, description, price, quantityInStock, imageURL, brandId, categoryId) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const values = [productName, description, priceTo, quantityInStockTo, imageURL, brandId, categoryId];
  return await pool.query(query,values);
}


// get brand id by name
exports.getBrandIdByName = async (brandName) => await pool.query("SELECT * FROM Brands WHERE name  = $1", [brandName]);


exports.getCategoryIdByName = async (categoryName) => await pool.query("SELECT * FROM Category WHERE name = $1", [categoryName]);


// edit product
exports.updateProduct = async ({productId, productName, description, priceTo, quantityInStockTo, imageURL, brandId, categoryId}) => {
  const query = "UPDATE Products SET productName = $1, description = $2, price = $3, quantityInStock = $4, imageURL = $5, brandId = $6, categoryId = $7 WHERE productId = $8 RETURNING *";
  const values = [productName, description, priceTo, quantityInStockTo, imageURL, brandId, categoryId, productId];
  return await pool.query(query, values);
}


// delete product
exports.deleteProductById = async (productId) => await pool.query("DELETE FROM Products WHERE productId = $1 RETURNING *", [productId]);