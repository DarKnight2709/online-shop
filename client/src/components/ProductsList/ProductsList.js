import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import './productList.css';

export default function ProductsList({ itemArr, filters }) {
  console.log(itemArr);
 
  const { minPrice, maxPrice, inStockOnly } = filters;
  const min = Number(minPrice) || 0;
  const max = Number(maxPrice) || Infinity;

  const filtered = itemArr.filter((item) => {
    const matchPrice = Number(item.price) >= min && Number(item.price) <= max;

    let isAvailable = true;
    if (inStockOnly) {
      isAvailable = item.quantityinstock > 0;
    }

    return matchPrice && isAvailable;
  });

  return (
    filtered.length > 0 ? (
      <div className="row row-cols-2 row-cols-md-3 gx-5 gy-5">
        {filtered.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </div>
    ) : (
      <div className="no-products">
        <h4>Rất tiếc! Không tìm thấy sản phẩm phù hợp.</h4>
        <p>Vui lòng thử điều chỉnh bộ lọc của bạn.</p>
      </div>
    )
  );
}
