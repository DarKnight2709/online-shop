import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; 
import './App.css';
import Register from "./pages/Register";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
