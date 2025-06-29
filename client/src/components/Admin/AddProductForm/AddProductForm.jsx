import React, { useEffect, useState } from "react";
import { loadCategories, selectAllCategories } from "../../../features/category/categoriesListSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../../features/productsList/productsListSlice";
import Modal from "../Modal/Modal";
import { loadBrands, selectAllBrands } from "../../../features/brand/brandsListSlice";
import { useNavigate } from "react-router-dom";

// Form to add or edit a product (static UI)
const AddProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantityInStock, setQuantityInStock] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [category, setCategory] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newBrandName, setNewBrandName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const categories = useSelector(selectAllCategories);
  const brands = useSelector(selectAllBrands);

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadBrands());
  }, []);

  const onHandleAddNewCategory = async () => {
    if (!newCategoryName) return;
    try {
      const result = await fetch('http://localhost:5000/api/category/', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newCategoryName })
      });
      if (result.ok) {
        alert('Added the category');
        setShowCategoryModal(false);
        setNewCategoryName('');
        dispatch(loadCategories());
      } else {
        alert('Failed');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const onHandleAddNewBrand = async () => {
    if (!newBrandName) return;
    try {
      const result = await fetch('http://localhost:5000/api/brand/', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newBrandName })
      });
      if (result.ok) {
        alert('Added the brand');
        setShowBrandModal(false);
        setNewBrandName('');
        dispatch(loadBrands());
      } else {
        alert('Failed');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const product = {
      productName,
      price,
      quantityInStock,
      imageURL,
      categoryName: category,
      brandName: brand,
      description
    };

    try {
      const result = await fetch('http://localhost:5000/api/products/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      if (result.ok) {
        dispatch(loadProducts({ type: 'default' }));
        alert('Add a new product successfully');
        resetForm();
        navigate(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function resetForm() {
    setProductName('');
    setPrice('');
    setQuantityInStock('');
    setImageURL('');
    setCategory('');
    setBrand('');
    setDescription('');
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
      {/* Left: Form */}
      <section className="panel panel--form" style={{ flex: 1 }}>
        <h3 className="panel__title">Thêm sản phẩm mới</h3>
        <form>
          <input
            type="text"
            placeholder="Tên sản phẩm"
            className="form__input"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Giá"
            className="form__input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Số lượng tồn kho"
            className="form__input"
            value={quantityInStock}
            onChange={(e) => setQuantityInStock(e.target.value)}
          />
          <input
            type="text"
            placeholder="Đường dẫn hình ảnh"
            className="form__input"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
          <select className="form__input" value={category} onChange={(e) => {
            if (e.target.value === 'add-category') {
              setShowCategoryModal(true);
              return;
            }
            setCategory(e.target.value);
          }}>
            <option value={''}>--Chọn danh mục--</option>
            {categories.map((each, index) => (
              <option key={index} value={each.name}>{each.name}</option>
            ))}
            <option value="add-category">+ Thêm danh mục mới</option>
          </select>

          <select className="form__input" value={brand} onChange={(e) => {
            if (e.target.value === 'add-brand') {
              setShowBrandModal(true);
              return;
            }
            setBrand(e.target.value);
          }}>
            <option value={''}>--Chọn thương hiệu--</option>
            {brands.map((each, index) => (
              <option key={index} value={each.name}>{each.name}</option>
            ))}
            <option value="add-brand">+ Thêm thương hiệu mới</option>
          </select>

          <textarea
            placeholder="Mô tả sản phẩm"
            className="form__input form__textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" onClick={onSubmit} className="form__button">
            Thêm sản phẩm
          </button>
        </form>

        <Modal isOpen={showCategoryModal} onClose={() => setShowCategoryModal(false)}>
          <h3>Thêm danh mục mới</h3>
          <input
            type="text"
            placeholder="Tên danh mục"
            className="form__input"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button onClick={onHandleAddNewCategory} className="form__button">Thêm danh mục</button>
        </Modal>

        <Modal isOpen={showBrandModal} onClose={() => setShowBrandModal(false)}>
          <h3>Thêm thương hiệu mới</h3>
          <input
            type="text"
            placeholder="Tên thương hiệu"
            className="form__input"
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
          />
          <button onClick={onHandleAddNewBrand} className="form__button">Thêm thương hiệu</button>
        </Modal>
      </section>

      {/* Right: Image preview */}
      <div style={{ flex: 1 }}>
        {imageURL ? (
          <img
            src={imageURL}
            alt="Xem trước ảnh"
            style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        ) : (
          <p style={{ fontStyle: 'italic', color: '#888' }}>Hình ảnh xem trước sẽ xuất hiện tại đây.</p>
        )}
      </div>
    </div>
  );
};

export default AddProductForm;
