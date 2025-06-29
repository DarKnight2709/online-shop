import ProductList from '../../Admin/ProductList/ProductList';

import AddProductForm from '../../Admin/AddProductForm/AddProductForm';
import { useDispatch } from 'react-redux';
import { loadCategories } from '../../../features/category/categoriesListSlice';
import { useEffect } from 'react';
import { useActionData, useSearchParams } from 'react-router-dom';
import { loadProducts } from '../../../features/productsList/productsListSlice';



const ProductAdminPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts({}))
  })
  return <div>
    <AddProductForm />
    <ProductList />
  </div>
}


export default ProductAdminPage;
