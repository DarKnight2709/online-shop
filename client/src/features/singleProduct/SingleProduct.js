import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingProduct, loadProductData, selectProductData } from "./singleProductSlice";
import { updateCart } from "../../utils";
import formatVND from "../../utils/formatCurrency";

export default function SingleProduct() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [cartCount, setCartCount] = useState(1);   
    
    const isLoading = useSelector(isLoadingProduct);
    let product = useSelector(selectProductData);       
    
    const { productname, price, description, quantityinstock, imageurl } = product || {};

    useEffect(() => {
        dispatch(loadProductData(id));
    }, [dispatch, id]);    
   
    const handeAddToCart = async () => {
        if (cartCount > 0) {
            const status = await updateCart(product.productid, cartCount);
            if (status) {
                alert('Thêm vào giỏ hàng thành công');
            } else {
                alert('Thêm vào giỏ hàng thất bại');
            }
        }        
    }    

    const incrementCount = () => {
        if (quantityinstock > cartCount) {
            setCartCount(cartCount + 1);
        }
    }

    const decrementCount = () => {
        if (cartCount > 1) {
            setCartCount(cartCount - 1);
        }
    }

    const handleChange = (e) => {
        if (e.target.value === '') {
            setCartCount(1);
        } else {
            const val = parseInt(e.target.value);
            if (val > quantityinstock) {
                alert(`Chỉ còn ${quantityinstock} sản phẩm trong kho`);
                setCartCount(quantityinstock);
            } else if (val < 1) {
                setCartCount(1);
            } else {
                setCartCount(val);
            }
        }        
    }

    if (isLoading) {
        return <p>Đang tải dữ liệu...</p>
    }

    return (
        <div className="container">
            <div className="row mt-4 gx-5 gy-4">
                <div className="col-sm-6 col-lg-7">
                    <img className="img-fluid" alt={productname} src={`${imageurl}`} />
                </div>
                <div className="col-sm-6 col-lg-5">
                    <h1 className="display-6">{productname}</h1>
                    <p className="h5 mt-4">{`${formatVND(price)}`}</p>
                    <hr />
                    <div className="row mb-4">
                        <div className="col">
                            {quantityinstock > 0 ?
                                <>                              
                                    <div className="row mt-5">
                                        <div className="col d-flex cart-count-parent">              
                                            <button onClick={decrementCount} className="btn btn-secondary px-auto py-0 rounded-0 text-center">-</button>                    
                                            <input className="form-control rounded-0 px-0 text-center" type="number" value={cartCount} min="0" max={quantityinstock} onChange={handleChange} />
                                            <button onClick={incrementCount} className="btn btn-secondary px-auto py-0 rounded-0 text-center">+</button>                   
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col mt-4 mb-3">
                                            <button onClick={handeAddToCart} className="btn btn-dark px-5 py-2 w-100 fs-5 rounded-0">
                                                Thêm vào giỏ hàng
                                            </button>
                                        </div>
                                    </div>  
                                </>                
                                : 
                                <p className="text-danger">Hết hàng</p>
                            }
                        </div>
                    </div>                    
                    <p className="lead fs-5 fs-md-4">{description}</p>                     
                </div>
            </div>
        </div>        
    );
}
