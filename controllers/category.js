const {
  throwError
} = require("../utils");
const {
  getCategories,
  addCategory,
  findProductsByCategory,
  updateCategory,
  deleteCategory,
  fetchBrand,
  findByCategoryAndBrand
} = require('../models/category');


// get all category
exports.getAllCategories = async (req, res, next) => {
  try {
    const results = await getCategories();
    if (results.rows.length === 0) {
      throwError('No Categories Found', 404);
    }
    return res.status(200).json({
      categories: results.rows
    });
  } catch (error) {
    next(error);
  }
}




// add a category
exports.addNewCategory = async (req, res, next) => {
  try {
    const results = await addCategory(req.body.name);

    if (results.rows.length === 0) {
      throwError('Adding new Category Failed', 400);
    }
    return res.status(201).send(`New Category ${req.body.category} added with id ${results.rows[0].categoryid}`);
  } catch (error) {
    next(error);
  }

}


// get products by categoryId
exports.getByCategory = async (req, res, next) => {
  try {
    console.log(req.categoryId)
    const results = await findProductsByCategory(req.categoryId);
    return res.status(200).json({
      products: results.rows
    });
  } catch (error) {
    next(error);
  }
}


// edit category
exports.editCategory = async (req, res, next) => {
  try {
    const categoryName = req.body.name;
    const updated = await updateCategory(req.categoryId, categoryName);
    if (updated.rows.length === 0) {
      throwError('Database Connection Error');
    }
    return res.status(201).send(`Updated category with id ${req.categoryId}`);

  } catch (error) {
    next(error);
  }
}

// delete category

exports.deleteCategory = async (req, res, next) => {
  try {
    const deleted = await deleteCategory(req.categoryId);
    if (deleted.rows.length === 0) {
      throwError("Database connection Error");
    }
    return res.status(204).send();

  } catch (error) {
    next(error);
  }
}



// get brand with corresponding category
exports.getBrand = async (req, res, next) => {
  try {
    const result = await fetchBrand();
    const rows = result.rows;

    const grouped = new Map();

    rows.forEach(row => {
      const categoryKey = row.category_id;

      if (!grouped.has(categoryKey)) {
        grouped.set(categoryKey, {
          category: {
            id: row.category_id,
            category_name: row.category_name
          },
          brand: []
        });
      }

      // Kiểm tra xem brand đã tồn tại trong mảng chưa (để tránh trùng lặp)
      const group = grouped.get(categoryKey);
      const exists = group.brand.find(b => b.id === row.brand_id);

      if (!exists) {
        group.brand.push({
          id: row.brand_id,
          brand_name: row.brand_name
        });
      }
    });

    const finalJson = Array.from(grouped.values());

    return res.status(200).json(finalJson);

  } catch (error) {
    next(error);
  }

}


// get product by categoryid and brandid
exports.getByCategoryAndBrand = async (req, res, next) => {
  try {
    console.log(req.categoryId);
    console.log(req.brandId);
    const results = await findByCategoryAndBrand(req.categoryId, req.brandId);
    return res.status(200).json({
      products: results.rows
    });
  } catch (error) {
    next(error);
  }

}