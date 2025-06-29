import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllBrands, loadBrands } from "../../features/brand/brandsListSlice";
import { selectAllCategories, loadCategories } from "../../features/category/categoriesListSlice";

import './productFilter.css';

const ProductFilter = ({ onFilterChange }) => {
  const dispatch = useDispatch();

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleFilterChange = () => {
    onFilterChange({
      minPrice,
      maxPrice,
      inStockOnly,
    });
  };

  return (
    <div className="filter-container">
      <h3>Lọc sản phẩm</h3>

      <div className="filter-group">
        <label>Khoảng giá</label>
        <select
          value={`${minPrice}-${maxPrice}`}
          onChange={(e) => {
            const [min, max] = e.target.value.split('-');
            setMinPrice(min || '');
            setMaxPrice(max || '');
          }}
        >
          <option value="-">-- Tất cả mức giá --</option>
          <option value="0-1000000">Dưới 1 triệu</option>
          <option value="1000000-5000000">1 - 5 triệu</option>
          <option value="5000000-10000000">5 - 10 triệu</option>
          <option value="10000000-20000000">10 - 20 triệu</option>
          <option value="20000000-50000000">20 - 50 triệu</option>
          <option value="50000000-">Trên 50 triệu</option>
        </select>
      </div>

      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          &nbsp;Chỉ hiển thị sản phẩm còn hàng
        </label>
      </div>

      <button onClick={handleFilterChange} className="filter-button">
        Áp dụng bộ lọc
      </button>
    </div>
  );
};

export default ProductFilter;
