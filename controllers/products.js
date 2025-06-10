const {
  fetchAllProducts,
  fetchProductSearch,
  createNewProduct,
  getBrandIdByName,
  
  updateProduct,
  deleteProductById

} = require("../models/products");

const {getCategoryIdByName} = require("../models/products");

const {throwError} = require("../utils/index");

// get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await fetchAllProducts();

    // no products
    if (allProducts.rows.length === 0) {
      res.status(404).json({
        message: "No Products Found",
      });
    }

    return res.status(200).json({
      products: allProducts.rows
    });


  } catch (error) {
    next(error);
  }
}


// search products by keyword
exports.searchProducts = async (req, res, next) => {
  const {
    searchTerm
  } = req.query;
  if (!searchTerm) {
    return res.status(400).json({
      message: "Search term is required",
    })
  }
  try {
    const results = await fetchProductSearch(searchTerm);
    return res.status(200).json({
      products: results.rows
    })
  } catch (error) {
    next(error);
  }



}

// add new product
exports.addNewProduct = async (req, res, next) => {
  const {
    productName,
    description,
    price,
    quantityInStock,
    imageURL,
    brandName,
    categoryName
  } = req.body;

  const priceTo = parseFloat(price);
  const quantityInStockTo = parseInt(quantityInStock);

  try {
    const brandResult = await getBrandIdByName(brandName);
    let brandId = null;
    if (brandResult.rows.length > 0)
      brandId = brandResult.rows[0].brandid;
    const categoryResult = await getCategoryIdByName(categoryName);
    let categoryId = null;
    if (categoryResult.rows.length > 0)
      categoryId = categoryResult.rows[0].categoryid;
    const newProduct = await createNewProduct({
      productName,
      description,
      priceTo,
      quantityInStockTo,
      imageURL,
      brandId,
      categoryId
    });


    if (newProduct.rows.length === 0) {
      throwError("Database connection error", 500);
    }
    return res.status(201).json({
      product: newProduct.rows[0]
    })


  } catch (error) {
    next(error);
  }


}



// get sinlge product
exports.getSingleProduct = async (req, res) => {
  return res.status(200).json({
    product: req.product
  });
}


// edit product
exports.editProduct = async (req, res, next) => {
  const {
    productName,
    description,
    price,
    quantityInStock,
    imageURL,
    brandName,
    categoryName
  } = req.body;

  const priceTo = parseFloat(price);
  const quantityInStockTo = parseInt(quantityInStock);

  try {
    const brandResult = await getBrandIdByName(brandName);
    let brandId = null;
    if (brandResult.rows.length > 0)
      brandId = brandResult.rows[0].brandid;

    const categoryResult = await getCategoryIdByName(categoryName);
    let categoryId = null;
    if (categoryResult.rows.length > 0)
      categoryId = categoryResult.rows[0].categoryid;

    const updated = await updateProduct({
      productId: req.product.productid,
      productName,
      description,
      priceTo,
      quantityInStockTo,
      imageURL,
      brandId,
      categoryId
    });


    if (updated.rows.length === 0) {
      throwError("Database connection error", 500);
    }
    return res.status(201).json({
      product: updated.rows[0]
    })


  } catch (error) {
    next(error);
  }
}


// delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = parseInt(req.product.productid);
    const deleted = await deleteProductById(productId);
    if(deleted.rows.length === 0) {
      throwError("Database connection Error", 500);
    }
    return res.status(200).json({
      product: deleted.rows[0],
    })

  } catch (error) {
    next(error);
  }
}