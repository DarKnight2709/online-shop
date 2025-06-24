import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login"; 
import './App.css';
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin/Admin";
import { useDispatch } from "react-redux";
import { RouterProvider, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
import Root from './components/Root/Root';
import AdminRoot from './components/Root/AdminRoot';
import SearchPage from './components/Shop/SearchPage';
import { setUser } from "./features/session/sessionSlice";
import { useEffect } from "react";
import SingleProduct from "./features/singleProduct/SingleProduct";
import { loadCart } from './features/cart/cartSlice';
import CartPage from './features/cart/CartPage';
import Checkout from './components/Checkout/Checkout';
import CategoryPage from './components/Shop/CategoryPage';
import BrandPage from './components/Shop/BrandPage'
import AdminHome from "./components/pages/Admin/AdminHome";
import ProductPage from "./components/pages/Admin/ProductPage";
import ProtectedRoute from "./components/CustomRoute/ProtectedRoot";

function App({user}) {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(loadCart());
    dispatch(setUser(user)); // không cần thiết
  }, [dispatch, user]);

  const router = createBrowserRouter(createRoutesFromElements([
    <>
    <Route path='/' element={ <Root/> }>
      <Route index element={ <Home/> }/>
      <Route path="search" element={<SearchPage />}/>
      <Route path="product/:id/:title" element={<SingleProduct />} />
      <Route path='/cart' element={<ProtectedRoute><CartPage/></ProtectedRoute> }/>
      <Route path='/shop/category/:categoryId/:categoryName' element={ <CategoryPage />} />
      <Route path='/shop/category/:categoryId/:categoryName/:brandId/:brandName' element={ <BrandPage/>} />
    </Route> 
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />} />
    <Route path="/admin" element={<Admin />} />
    <Route path='/checkout' element={ <ProtectedRoute><Checkout/></ProtectedRoute>  }/>

    <Route path='/' element={ <AdminRoot />}>
      <Route path="/admin/home" element={<AdminHome />}></Route>
      <Route path='/admin/products' element={ <ProductPage />}/>
    </Route>
    
    </>
  ]));
  return (
    <RouterProvider router= { router }/>

    // <div className="App">
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/login" element={<Login />}></Route>
    //     <Route path="/admin" element={<Admin />}></Route>
    //   </Routes>
    // </div>
  );
}

export default App;
