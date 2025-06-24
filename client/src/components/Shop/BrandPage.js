import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { failedLoadProducts, isLoadingProducts, loadProducts, selectAllProducts } from "../../features/productsList/productsListSlice";
import ProductsList from "../ProductsList/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { escape } from "validator";

export default function BrandPage(){
    const { categoryId, categoryName, brandId, brandName }= useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingProducts);
    const isFailed = useSelector(failedLoadProducts);
    const products = useSelector(selectAllProducts);
    const navigate = useNavigate();

    const isValidCategoryId = parseInt(categoryId);
    const isValidBrandId = parseInt(brandId);

    useEffect(() => {
        if(!isValidCategoryId || !isValidBrandId || isFailed){
            navigate('/shop');           
        }
        dispatch(loadProducts({type: 'category', catId: isValidCategoryId, brandId: isValidBrandId}));  
    },[dispatch, isFailed, isValidCategoryId, isValidBrandId, navigate]);    

    return(
        <div className="container pt-5">
            {isLoading ? 'Loading Products' :
            <>
                <h1 class="display-6 text-capitalize">{categoryName} / {brandName}  </h1> 
                <ProductsList itemArr={products}/>
            </>            
            }           
        </div>
    )
    
}