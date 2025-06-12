import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login"; 
import './App.css';
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import { useDispatch } from "react-redux";
import { RouterProvider, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
import Root from './components/Root/Root';


function App() {
  const dispatch = useDispatch();

  const router = createBrowserRouter(createRoutesFromElements([
    <>
    <Route path='/' element={ <Root/> }>
      <Route index element={ <Home/> }/>
    </Route> 
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />} />
    <Route path="/admin" element={<Admin />} />
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
