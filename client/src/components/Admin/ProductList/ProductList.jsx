import { useDispatch, useSelector } from "react-redux";
import { loadProducts, selectAllProducts } from "../../../features/productsList/productsListSlice";
import { useEffect, useMemo, useState } from "react";
import { fetchCategoriesWithBrands } from "../../../utils";
import { button, useSearchParams } from "react-router-dom";

import formatVND from "../../../utils/formatCurrency";

import './productList.css';
import { loadBrands, selectAllBrands } from "../../../features/brand/brandsListSlice";
import { loadCategories, selectAllCategories } from "../../../features/category/categoriesListSlice";


// Table listing products (static data)
const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();


  const catId = searchParams.get('categoryId');
  const brandId = searchParams.get('brandId');

  // Sử dụng useMemo để tránh tính lại mỗi lần render:

  const dataObj = useMemo(() => {
    if (catId && brandId) return { type: 'category', catId, brandId };
    if (catId) return { type: 'category', catId };
    return { type: 'default' };
  }, [catId, brandId]);


  const [editProduct, setEditProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);


  const [categoriesWithBrands, setCategoriesWithBrands] = useState([]);

  const [categoryFlag, setCategoryFlag] = useState(false);


  const refreshData = () => {
    dispatch(loadProducts(dataObj));
    dispatch(loadCategories());
    dispatch(loadBrands());
  }
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);


  console.log(categoriesWithBrands)
  useEffect(() => {
    refreshData();
    console.log("DFDFF")
    // const setMenu = async () => {
    //   setCategoriesWithBrands(await fetchCategoriesWithBrands());
    // }
    // setMenu();
    fetchCategoriesWithBrands().then(setCategoriesWithBrands);
  }, [dispatch, catId, brandId]);

  console.log(brands);
  console.log(categories);
  console.log(products);

  console.log(categoriesWithBrands);


  const onHandleSaveEditProduct = async (prod) => {
    // setEditProduct(prod);
    // setShowEditForm(true);

    console.log(prod);
    try {
      const endpoint = `http://localhost:5000/api/products/${prod.productid}`;
      const result = await fetch(
        endpoint, {
        method: 'PUT',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: prod.productname,
          description: prod.description,
          price: prod.price,
          quantityInStock: prod.quantityinstock,
          imageURL: prod.imageurl,
          brandName: prod.brand,
          categoryName: prod.category
        })
      }
      );
      if (result.ok) {
        alert('Edit successfully');
        dispatch(loadProducts(dataObj));
      } else {
        alert('Edit failure');
      }

    } catch (error) {
      console.error(error.message);
    }
  }

  const onHandleDeleteProduct = async (prod) => {
    try {
      const endpoint = `http://localhost:5000/api/products/${prod.productid}`;
      const result = await fetch(
        endpoint, {
        method: 'DELETE',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      }
      );
      if (result.ok) {
        alert('Delete successfully');
        dispatch(loadProducts(dataObj));
      } else {
        alert('Delete failure');
      }

    } catch (error) {
      console.error(error.message);
    }
  }
  console.log(categories);
  console.log(editProduct);

  return (
    <section className="panel">
  <h3 className="panel__title">Danh sách sản phẩm</h3>
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
        <th>Tên</th>
        <th>Giá</th>
        <th>Tồn kho</th>
        <th>Hình ảnh</th>
        <th>Danh mục</th>
        <th>Thương hiệu</th>
        <th>Mô tả</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody>
      {products.map(prod => (
        <tr key={prod.productid}>
          <td>{prod.productid}</td>
          <td>{prod.productname}</td>
          <td>{formatVND(prod.price)}</td>
          <td>{prod.quantityinstock}</td>
          <td><img src={prod.imageurl} alt="" /></td>
          <td>{categories.find((each) => each.categoryid === prod.categoryid)?.name || "Không rõ"}</td>
          <td>{brands.find((each) => each.brandid === prod.brandid)?.name || "Không rõ"}</td>
          <td className="description-cell">{prod.description}</td>
          <td>
            <div className="action-buttons">
              <button className="btn btn--edit" onClick={() => {
                setEditProduct({
                  ...prod,
                  brand: brands.find((each) => each.brandid === prod.brandid).name,
                  category: categories.find((each) => each.categoryid === prod.categoryid).name
                });
                setShowEditForm(true);
              }}>Sửa</button>
              <button className="btn btn--delete" onClick={() => onHandleDeleteProduct(prod)}>Xóa</button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {showEditForm && editProduct && (
    <div className="modal-overlay" onClick={() => setShowEditForm(false)}>
      <div className="edit-form" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={() => setShowEditForm(false)} title="Đóng">×</button>
        <h3>Sửa sản phẩm</h3>
        <form onSubmit={async (e) => {
          e.preventDefault();
          await onHandleSaveEditProduct(editProduct);
          setShowEditForm(false);
        }}>
          <label>
            Tên:
            <input
              type="text"
              value={editProduct.productname}
              onChange={(e) => setEditProduct({ ...editProduct, productname: e.target.value })}
            />
          </label>

          <label>
            Giá:
            <input
              type="number"
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
            />
          </label>

          <label>
            Tồn kho:
            <input
              type="number"
              value={editProduct.quantityinstock}
              onChange={(e) => setEditProduct({ ...editProduct, quantityinstock: e.target.value })}
            />
          </label>

          <label>
            Đường dẫn hình ảnh:
            <input
              type="text"
              value={editProduct.imageurl}
              onChange={(e) => setEditProduct({ ...editProduct, imageurl: e.target.value })}
            />
          </label>

          <label>
            Danh mục:
            <select
              className="form__input"
              value={editProduct.category}
              onChange={(e) => {
                setEditProduct({ ...editProduct, category: e.target.value });
                if (editProduct.category !== e.target.value) setCategoryFlag(true);
              }}
            >
              <option value={editProduct.category}>{editProduct.category}</option>
              {categoriesWithBrands
                .filter(each => each.category.category_name !== editProduct.category)
                .map((each, index) => (
                  <option key={index} value={each.category.category_name}>
                    {each.category.category_name}
                  </option>
              ))}
            </select>
          </label>

          <label>
            Thương hiệu:
            <select
              className="form__input"
              value={categoryFlag ? '0' : editProduct.brand}
              onChange={(e) => {
                setEditProduct({ ...editProduct, brand: e.target.value });
                if (categoryFlag) setCategoryFlag(false);
              }}
            >
              <option value={categoryFlag ? '0' : editProduct.brand}>
                {categoryFlag ? '--Chọn thương hiệu--' : editProduct.brand}
              </option>

              {categoriesWithBrands.length > 0 && categoryFlag
                ? categoriesWithBrands.find(each => each.category.category_name === editProduct.category)
                    .brand.map((each, index) => (
                      <option key={index} value={each.brand_name}>
                        {each.brand_name}
                      </option>
                    ))
                : categoriesWithBrands.find(each => each.category.category_name === editProduct.category)
                    .brand.filter(each => each.brand_name !== editProduct.brand)
                    .map((each, index) => (
                      <option key={index} value={each.brand_name}>
                        {each.brand_name}
                      </option>
                    ))}
            </select>
          </label>

          <label>
            Mô tả:
            <textarea
              rows="3"
              value={editProduct.description}
              onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
            />
          </label>

          <button type="submit" className="btn btn--edit">Lưu</button>
          <button type="button" className="btn btn--delete" onClick={() => setShowEditForm(false)}>Hủy</button>
        </form>
      </div>
    </div>
  )}
</section>

  );
};


export default ProductList