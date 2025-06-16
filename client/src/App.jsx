import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login"; 
import './App.css';
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import { useDispatch } from "react-redux";
import { RouterProvider, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
import Root from './components/Root/Root';
import SearchPage from './components/Shop/SearchPage';
import { setUser } from "./features/session/sessionSlice";
import { useEffect } from "react";
import SingleProduct from "./features/singleProduct/SingleProduct";
import { loadCart } from './features/cart/cartSlice';
import CartPage from './features/cart/CartPage';


function App({user}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCart());
    dispatch(setUser(user)); // không cần thiết
  }, [dispatch, user]);

  const router = createBrowserRouter(createRoutesFromElements([
    <>
    <Route path='/' element={ <Root/> }>
      <Route index element={ <Home/> }/>
      <Route path="search" element={<SearchPage />}/>
      <Route path="product/:id/:title" element={<SingleProduct />} />
    </Route> 
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />} />
    <Route path="/admin" element={<Admin />} />
    <Route path='/cart' element={ <CartPage/> }/>
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
