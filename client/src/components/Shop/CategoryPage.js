import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    failedLoadProducts,
    isLoadingProducts,
    loadProducts,
    selectAllProducts
} from "../../features/productsList/productsListSlice";
import ProductsList from "../ProductsList/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { escape } from "validator";
import ProductFilter from "../ProductFilter/ProductFilter";
import './categoryPage.css';

export default function CategoryPage() {
    const { categoryId, categoryName } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingProducts);
    const isFailed = useSelector(failedLoadProducts);
    const products = useSelector(selectAllProducts);
    const navigate = useNavigate();

    const isValid = parseInt(categoryId);

    useEffect(() => {
        if (!isValid || isFailed) {
            navigate('/shop');
        }
        dispatch(loadProducts({ type: 'category', catId: isValid }));
    }, [dispatch, isFailed, isValid, navigate]);

    const [filters, setFilters] = useState({});

    return (
        <div className="container pt-5">
            {isLoading ? 'Đang tải sản phẩm...' :
                <>
                    <h1 className="display-6 text-capitalize">{escape(categoryName)}</h1>
                    <div className="product-page-layout">
                        <div className="filter-column">
                            <ProductFilter onFilterChange={setFilters} />
                        </div>
                        <div className="product-column">
                            <ProductsList itemArr={products} filters={filters} />
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
