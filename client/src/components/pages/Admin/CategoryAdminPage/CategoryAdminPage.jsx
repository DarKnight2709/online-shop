import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBrands, selectAllBrands } from "../../../../features/brand/brandsListSlice";
import { loadCategories, selectAllCategories } from "../../../../features/category/categoriesListSlice";
import "./categoryAdminPage.css";

const CategoryAdminPage = () => {
  const dispatch = useDispatch();

  const categories = useSelector(selectAllCategories);
  const brands = useSelector(selectAllBrands);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newBrandName, setNewBrandName] = useState('');

  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editName, setEditName] = useState('');

  const openEditModal = (type, item) => {
    setEditTarget({ type, id: item.categoryid || item.brandid });
    setEditName(item.name);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!editName.trim()) return;

    try {
      const endpoint =
        editTarget.type === 'category'
          ? `http://localhost:5000/api/category/${editTarget.id}`
          : `http://localhost:5000/api/brand/${editTarget.id}`;

      const res = await fetch(endpoint, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName }),
      });

      if (res.ok) {
        alert(`${editTarget.type === 'category' ? 'Danh mục' : 'Thương hiệu'} đã được cập nhật thành công`);
        setShowEditModal(false);
        setEditTarget(null);
        if (editTarget.type === 'category') dispatch(loadCategories());
        else dispatch(loadBrands());
      } else {
        alert('Cập nhật thất bại');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadBrands());
  }, [dispatch]);

  const handleAddCategory = async () => {
    if (!newCategoryName) return;
    try {
      const res = await fetch('http://localhost:5000/api/category/', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
      });
      if (res.ok) {
        alert("Đã thêm danh mục");
        setNewCategoryName('');
        dispatch(loadCategories());
      } else {
        alert("Thêm danh mục thất bại");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddBrand = async () => {
    if (!newBrandName) return;
    try {
      const res = await fetch('http://localhost:5000/api/brand/', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newBrandName }),
      });
      if (res.ok) {
        alert("Đã thêm thương hiệu");
        setNewBrandName('');
        dispatch(loadBrands());
      } else {
        alert("Thêm thương hiệu thất bại");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (cat) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${cat.name}" không?`)) return;
    try {
      const res = await fetch(`http://localhost:5000/api/category/${cat.categoryid}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        alert('Đã xóa danh mục');
        dispatch(loadCategories());
      } else {
        alert('Xóa thất bại');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBrand = async (brand) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa thương hiệu "${brand.name}" không?`)) return;
    try {
      const res = await fetch(`http://localhost:5000/api/brand/${brand.brandid}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        alert('Đã xóa thương hiệu');
        dispatch(loadBrands());
      } else {
        alert('Xóa thất bại');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container">
      <h1>Quản lý Danh mục & Thương hiệu</h1>
      <div className="admin-grid">
        {/* Category Section */}
        <div className="admin-box">
          <h2>Danh mục</h2>
          <div className="form-section">
            <input
              type="text"
              placeholder="Tên danh mục mới"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button onClick={handleAddCategory}>Thêm</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên danh mục</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{cat.name}</td>
                  <td>
                    <button className="edit-btn" onClick={() => openEditModal('category', cat)}>Sửa</button>
                    <button className="delete-btn" onClick={() => handleDeleteCategory(cat)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Brand Section */}
        <div className="admin-box">
          <h2>Thương hiệu</h2>
          <div className="form-section">
            <input
              type="text"
              placeholder="Tên thương hiệu mới"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
            />
            <button onClick={handleAddBrand}>Thêm</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên thương hiệu</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{brand.name}</td>
                  <td>
                    <button className="edit-btn" onClick={() => openEditModal('brand', brand)}>Sửa</button>
                    <button className="delete-btn" onClick={() => handleDeleteBrand(brand)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Chỉnh sửa {editTarget.type === 'category' ? 'danh mục' : 'thương hiệu'}</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleUpdate}>Cập nhật</button>
              <button onClick={() => setShowEditModal(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryAdminPage;
