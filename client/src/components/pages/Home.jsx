// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { selectUser } from "../../features/session/sessionSlice";
// import { logOutUser } from "../../features/session/sessionSlice";


// function Home() {
//   // const response = fetch("http://localhost:5000/api/auth/home");

//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);
//   const navigate = useNavigate();

//   const logOut = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/logout", {
//         method: "DELETE",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.ok) {
//         console.log("Logout successful");
//         // Dispatch an action to update the Redux store
//         dispatch(logOutUser());
//         navigate('/login'); // Redirect to login page
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (error) {
//       console.error(error.message);
//     }

//   }


//   const register = () => {

//   }

//   return <div>
//     {user ? 
//       (<button onClick={logOut}>Logout</button>)
//       :
//       <>
//         <Link to="/register">Register</Link>
//         <br />
//         <Link to="/login">Login</Link>
//       </>
      
//     }
    
//     <h1>This is home page</h1>
//   </div>
// }


// export default Home;







import React, { useEffect } from "react";
import { Carousel } from 'bootstrap'; // ✅ import bootstrap js manually
import { useDispatch, useSelector } from "react-redux";
import { loadProducts, selectAllProducts } from "../../features/productsList/productsListSlice.js";
import ProductsList from "../ProductsList/ProductsList.js";
import './home.css';

export default function Home() {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);

    useEffect(() => {
        dispatch(loadProducts({type: 'default'}));
    }, [dispatch]);

    //  Fix Bootstrap Carousel manually
    useEffect(() => {
        const carouselElement = document.querySelector('#carouselExampleIndicators');
        if (carouselElement) {
            new Carousel(carouselElement, {
                interval: 3000,
                ride: 'carousel'
            });
        }
    }, []);

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="column">
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src="images/banner1-1.jpg" className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                        <img src="images/banner2-1.jpg" className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                        <img src="images/banner3-1.jpg" className="d-block w-100" alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="container mt-5">
            <ProductsList itemArr={products}/>
        </div>
        </>
    );
}
