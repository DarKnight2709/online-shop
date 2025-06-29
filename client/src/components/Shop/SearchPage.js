import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { isLoadingProducts, loadProducts, selectAllProducts } from "../../features/productsList/productsListSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductsList from "../ProductsList/ProductsList";
import { escape } from "validator";

export default function SearchPage(){
    const [ searchParams ] = useSearchParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingProducts);
    const products = useSelector(selectAllProducts);

    console.log(products);
    const sTerm = escape(searchParams.get('terms'));
    
    useEffect(() => {
        dispatch(loadProducts({type: 'search', searchTerm: sTerm}));        
    }, [dispatch, searchParams, sTerm]);

    return(
        <div className="container pt-5">
            <h1 className="display-6">{`Search Results for "${sTerm}"`}</h1> 
            {isLoading ? 'Loading Products' : 
            <ProductsList itemArr={products} filters={{}}/>
            }           
        </div>
    );
}