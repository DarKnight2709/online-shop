import { useDispatch, useSelector } from "react-redux";
import { loadProducts, selectAllProducts } from "../../../features/productsList/productsListSlice";
import { useEffect, useState } from "react";
import { fetchCategoriesWithBrands } from "../../../utils";
import { button, useSearchParams } from "react-router-dom";

import './productList.css';
import { loadBrands, selectAllBrands } from "../../../features/brand/brandsListSlice";
import { loadCategories, selectAllCategories } from "../../../features/category/categoriesListSlice";


// Table listing products (static data)
const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();


  const catId = searchParams.get('categoryId');
  const brandId = searchParams.get('brandId');

  let dataObj = {};

  if (catId && brandId) {
    dataObj = {
      type: 'category',
      catId,
      brandId,
    }
  } else if (catId && !brandId) {
    dataObj = {
      type: 'category',
      catId,
    }
  } else {
    dataObj = {
      type: 'default'
    }

  }


  const [editProduct, setEditProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);


  const [categoriesWithBrands, setCategoriesWithBrands] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');


  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);

  console.log(categoriesWithBrands)
  useEffect(() => {
    dispatch(loadProducts(dataObj));
    dispatch(loadCategories());
    dispatch(loadBrands());
    console.log("DFDFF")
    const setMenu = async () => {
      setCategoriesWithBrands(await fetchCategoriesWithBrands());
    }
    setMenu();
  }, [dispatch, catId, brandId]);

  console.log(brands);
  console.log(categories);
  console.log(products);



  const onHandleSaveEditProduct = async (prod) => {
    setEditProduct(prod);
    setShowEditForm(true);
    try {
      // const endpoint = `http://localhost:5000/api/products/${prod.productid}`;
      // const result = await fetch(
      //   endpoint, {
      //     method: 'PUT',
      //     credentials: "include",
      //     body: JSON.stringify({
      //       productName: prod.productname,
      //       description: prod.description,
      //       price: prod.price,
      //       quantityInStock: prod.quantityinstock,
      //       imageURL: prod.imageurl,
      //       brandName: prod.bran

      //     })
      //   }
      // )
    } catch (error) {

    }



  }

  return (
    <section className="panel">
      <h3 className="panel__title">Product List</h3>
      <nav className="category-nav">
        <ul className="category-list">
          {categoriesWithBrands.map((cat, index) => (
            <li className="category-item" key={index}>
              <button
                className="category-button"
                onClick={() => {
                  setSearchParams({
                    categoryId: `${cat.category.id}`
                  });
                  document.activeElement?.blur();

                }}
              >
                {cat.category.category_name}
              </button>
              <ul className="brand-submenu">
                {cat.brand.map((brand, idx) => (
                  <li key={idx}>
                    <button
                      className="brand-button"
                      onClick={() => {
                        setSearchParams({
                          categoryId: `${cat.category.id}`,
                          brandId: `${brand.id}`
                        });
                        document.activeElement?.blur();

                      }}
                    >
                      {brand.brand_name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      <table className="table">
        <thead>

          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity in stock</th>
            <th>Image</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.productid}>
              <td>{prod.productid}</td>
              <td>{prod.productname}</td>
              <td>${prod.price}</td>
              <td>{prod.quantityinstock}</td>
              <td><img src={prod.imageurl} alt="" /></td>
              <td>{categories[prod.categoryid - 1]?.name || "N/A"}</td>
              <td>{brands[prod.brandid - 1]?.name || "N/A"}</td>
              <td className="description-cell"> {prod.description}</td>

              <td>
                <div className="action-buttons">
                  <button className="btn btn--edit"
                    onClick={
                      () => {
                        setEditProduct({ ...prod, brand: brands[prod.brandid - 1].name, category: categories[prod.categoryid - 1].name });
                        setShowEditForm(true);
                      }
                    }

                  >Edit</button>
                  <button className="btn btn--delete">Delete</button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditForm && editProduct && (
        <div className="modal-overlay" onClick={() => setShowEditForm(false)}>
          <div
            className="edit-form"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setShowEditForm(false)}
              title="Close"
            >
              ×
            </button>
            <h3>Edit Product</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Updated Product:", editProduct);
                setShowEditForm(false);
              }}
            >
              <label>
                Name:
                <input
                  type="text"
                  value={editProduct.productname}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, productname: e.target.value })
                  }
                />
              </label>

              <label>
                Price:
                <input
                  type="number"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, price: e.target.value })
                  }
                />
              </label>

              <label>
                Quantity in Stock:
                <input
                  type="number"
                  value={editProduct.quantityinstock}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, quantityinstock: e.target.value })
                  }
                />
              </label>

              <label>
                Image URL:
                <input
                  type="text"
                  value={editProduct.imageurl}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, imageurl: e.target.value })
                  }
                />
              </label>

              <label>
                Category:
                <select className="form__input" value={categoryIndex} onChange={(e) => {
                  const index = Number(e.target.value);
                  if (index === 0) {
                    setCategory('');
                    setCategoryIndex(0);
                    setEditProduct({ ...editProduct, category: category })
                    return;
                  }
                  setCategory(categoriesWithBrands[index - 1].category.category_name);
                  setCategoryIndex(index);
                  if (category) {
                    setEditProduct({ ...editProduct, category });
                  }
                }}>
                  <option value={0}>{editProduct.category}</option>

                  {categoriesWithBrands.filter((each) => each.category.category_name !== editProduct.category).map((each, index) => {
                    return (
                      <option key={index} value={index + 1}>{each.category.category_name}</option>
                    )
                  })}
                </select>
              </label>

              <label>
                Brand:
                {/* <input
                  type="text"
                  value={editProduct.brand}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, brand: e.target.value })
                  }
                /> */}
                <select className="form__input" value={brand} onChange={(e) => {
                  setBrand(e.target.value);
                  setEditProduct({ ...editProduct, brand: brand})
                  }}>
                  <option value="">{editProduct.brand}</option>

                  {categoriesWithBrands.length > 0 && categoriesWithBrands[categoryIndex === 0 ? 0 : categoryIndex - 1].brand.map((each, index) => {
                    return (
                      <option key={index} value={each.brand_name}> {each.brand_name}</option>
                    )
                  })}
                </select>
              </label>


              <label>
                Description:
                <textarea
                  rows="3"
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, description: e.target.value })
                  }
                />
              </label>

              <button type="submit" className="btn btn--edit">Save</button>
              <button
                type="button"
                className="btn btn--delete"
                onClick={() => setShowEditForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}



    </section>
  );
};


export default ProductList