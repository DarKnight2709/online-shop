import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; 
import './App.css';
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
