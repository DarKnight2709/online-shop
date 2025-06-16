import React from "react";
import { Link } from "react-router-dom";
import './productCard.css';

export default function ProductCard({ product }) {
    const { productid, productname, price, imageurl } = product;
    console.log(imageurl);
    console.log(productname);
    
    return(
        <div className="col product-card px-4 py-3">
            <div className="card border-0 text-start">
                <div className="product-card-img text-center justify-content-center">
                    <Link to={`/product/${productid}/${productname}`}>
                        <img className="card-img-top" alt="image" src={`${imageurl}`}/>
                    </Link> 
                </div>
                <div className="product-card-content mt-3">             
                    <h3 className="card-title product-card fs-6 fs-md-5">
                        <Link to={`/product/${productid}/${productname}`}>
                          {productname}
                        </Link>
                    </h3>
                    </div>  
                <span className="fs-6">{`$${price}`}</span>                
            </div>
        </div>        
    );
}